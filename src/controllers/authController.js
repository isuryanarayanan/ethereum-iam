import jwt from 'jsonwebtoken';
import { generateOTP, sendOTPByEmail } from '../services/authService.js';
import config from '../config/config.js';
import User from '../models/userModel.js';
import Guest from '../models/guestModel.js';

const login = async (req, res) => {


  try {
    const { email, loginMethod, code } = req.body;

    if (!email || !loginMethod) {
      return res.status(400).json({ error: 'Email and login method are required' });
    }

    let user = await User.findOne({ email });

    if (loginMethod === 'otp') {
      if (code) {
        return handleOTPLogin(email, code, user, res);
      } else {
        return handleOTPSend(email, user, res);
      }
    } else if (loginMethod === 'google') {
      return handleGoogleLogin(email, user, res);
    } else {
      return res.status(400).json({ error: 'Invalid login method' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const handleOTPLogin = async (email, code, user, res) => {
  let guest = await Guest.findOne({ email });

  if (guest && guest.otp === code) {
    if (!user) {
      user = new User({ email });
      await user.save();
    }

    const token = generateToken(email);
    setCookie(res, token);
    await Guest.deleteOne({ email });
    return res.status(200).json({ message: 'Logged in successfully', user: user });
  } else {
    return res.status(400).json({ error: 'Invalid OTP' });
  }
};

const handleOTPSend = async (email, user, res) => {
  let guest = await Guest.findOne({ email });

  if (guest) {
    guest.otp = generateOTP();
    await guest.save();
  } else {
    guest = new Guest({ email, otp: generateOTP() });
    await guest.save();
  }

  sendOTPByEmail(email, guest.otp);
  return res.status(200).json({ message: 'OTP sent successfully' });
};

const handleGoogleLogin = async (email, user, res) => {
  if (!user) {
    user = new User({ email, googleId: 'google' });
    await user.save();
  } else if (!user.googleId) {
    user.googleId = 'google';
    await user.save();
  }

  const token = generateToken(email);
  setCookie(res, token);
  return res.status(200).json({ message: 'Logged in successfully' });
};

const generateToken = (email) => {
  return jwt.sign({ email }, config.jwtSecret, { expiresIn: '1h' });
};

const setCookie = (res, token) => {
  res.cookie('token', token, { httpOnly: true });
};

const logout = async (req, res) => {

  // Print all the users and guests in the database
  const users = await User.find();
  console.log('Users:', users);
  const guests = await Guest.find();
  console.log('Guests:', guests);

  try {
    // Check if the user is logged in
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: 'You are not logged in' });
    }

    res.clearCookie('token');
    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export { login, logout };
