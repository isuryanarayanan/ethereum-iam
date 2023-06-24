import { getUserById } from '../services/userService.js';

const getUserInfo = async (req, res) => {
  try {
    // Retrieve user information based on the authenticated user's ID
    const userId = req.user.id;
    const user = await getUserById(userId);

    // Return the user information
    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export { getUserInfo };
