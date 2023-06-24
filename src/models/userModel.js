import mongoose from 'mongoose';

// Define the user schema
const userSchema = new mongoose.Schema({

  email: {
    type: String,
    required: false,
    unique: true,
    lowercase: true,
    trim: true,
  },

  googleId: {
    type: String,
    required: false,
    unique: true,
    trim: true,
  },
  
});

// Create the User model
const User = mongoose.model('User', userSchema);

export default User;
