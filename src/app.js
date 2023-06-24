import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import config from './config/config.js';


const app = express();

// Connect to MongoDB
mongoose.connect(config.database.url, config.database.options).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.log(err);
});

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

export default app;
