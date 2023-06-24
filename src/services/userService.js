import User from '../models/userModel.js';
import Guest from '../models/guestModel.js';

// Function to retrieve user information by ID
const getUserById = async (userId) => {
  try {
    // Retrieve the user from the database based on the ID using the User model
    const user = await User.findById(userId);

    return user;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to retrieve user by ID');
  }
};

const createUser = async (userData) => {
  try {
    // Create a new user using the User model
    const user = new User(userData);

    // Save the user to the database
    await user.save();

    return user;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create user');
  }
};

const createGuestUser = async () => {
  try {
    // Create a new user using the Guest model
    const guest = new Guest();

    // Save the user to the database
    await guest.save();

    return guest;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create guest user');
  }
};


export { getUserById };
