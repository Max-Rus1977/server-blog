import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const testUserId = '66fbfe8531722b92d3ee8a48';
export const postId = '66d731346997ae9df81cfa48';
export const token = jwt.sign(
  { _id: testUserId },
  process.env.JWT_SECRET,
  { expiresIn: '1h', }
);