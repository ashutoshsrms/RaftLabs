// app.ts
import express, { Express, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
// import authRoutes from './routes/authRoutes';
import resourceRoutes from './routes/resourceRoutes';
import { MONGODB_URI , PORT,BASE_API} from './config';

const app: Express = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
// app.use('/auth', authRoutes);
console.log(BASE_API)
app.use(`${BASE_API}/resources`, resourceRoutes);

// Error handling middleware
app.use(
  (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // errorHandler(err, req, res, next);
  }
);

console.log(MONGODB_URI);

mongoose
  .connect(MONGODB_URI,{
    // No useNewUrlParser or uri_decode_auth options
  })
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
