import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  // Validate that all required fields are provided
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Username, email, and password are required" });
  }

  try {
    // Hash the password
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Create a new user with the hashed password
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();
    res.status(201).json("User created successfully!");

  } catch (error) {
    next(error);
  }
};
