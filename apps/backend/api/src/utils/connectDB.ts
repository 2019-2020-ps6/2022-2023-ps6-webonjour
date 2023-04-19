import mongoose from 'mongoose';
import config from 'config';
import asyncHandler from 'express-async-handler';

const connectDB = async (): Promise<void> => {
  try {
    const dbUrl = config.get<string>('dbUrl');
    console.log('Connecting to database...');
    await mongoose.connect(dbUrl);
    console.log('Database connected...');
  } catch (error: unknown) {
    setTimeout(asyncHandler(connectDB), 5000);
    console.log('Database connection failed...');
    console.log(error);
  }
};

export default connectDB;
