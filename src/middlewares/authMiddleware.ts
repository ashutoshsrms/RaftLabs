import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    (req as any).user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' }); 
};
