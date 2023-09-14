
import { Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

export const websocketAuthMiddleware = (
  socket: Socket,
  next: (err?: Error) => void
) => {
  const token = socket.handshake.auth.token;

  if (!token) {
    return next(new Error('No token provided'));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    (socket as any).user = decoded;
    next();
  } catch (err) {
    next(new Error('Token is not valid'));
  }
};
