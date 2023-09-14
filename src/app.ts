import express, { Express, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import resourceRoutes from './routes/resourceRoutes';
import authRoutes from './routes/authRoutes';
import { MONGODB_URI , PORT,BASE_API,} from './config';
import * as http from 'http';
import { Server } from 'socket.io';
import { websocketAuthMiddleware } from './middlewares/websocketAuthMiddleware'; 
import { initializeWebSocket } from './controllers/websocketController';


const app: Express = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use(`${BASE_API}/auth`, authRoutes);
app.use(`${BASE_API}/resources`, resourceRoutes);


// web soket work

const server = http.createServer(app);
const io = new Server(server);
initializeWebSocket(io);
export { io };

const resourceNamespace = io.of('/resources');

resourceNamespace.on('connection', (socket) => {
  console.log('A user connected via WebSocket');

  websocketAuthMiddleware(socket, (err: Error | undefined) => {
    if (err) {
      console.error('WebSocket authentication error:', err);
      socket.disconnect(true);
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});



mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
