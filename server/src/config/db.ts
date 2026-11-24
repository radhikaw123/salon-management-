import mongoose from 'mongoose';
import { env } from './env';

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log('MongoDB replica set connection established');
  } catch (error) {
    console.error('MongoDB connection failure:', error);
    process.exit(1);
  }
};
