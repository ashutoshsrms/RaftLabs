import { Request, Response } from 'express';
import User, { UserDocument } from '../models/User';
import { generateToken } from '../middlewares/authMiddleware';
import bcrypt from 'bcrypt';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existingUser: UserDocument | null = await User.findOne({ email }).exec();

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const token = generateToken(newUser._id);

    res.status(201).json({ message:'User Registered ',token });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
  
      const user: UserDocument | null = await User.findOne({ email }).exec();
  
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
  
      // Compare the provided password with the hashed password using bcrypt
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid password' });
      }
  
      const token = generateToken(user._id);
  
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  // Logout user
  export const logoutUser = (req: Request, res: Response) => {
    // You can implement logout logic here if needed
    res.json({ message: 'Logout successful' });
  };