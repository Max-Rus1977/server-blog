import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';

import userRouters from './routers/userRouters.js';
import postsRouters from './routers/postsRoutes.js';
import commentsRouter from './routers/commentsRoutes.js';
import imageUploadRouter from './routers/imageUploadRouter.js';

dotenv.config();

const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI;

mongoose
  .connect(DB_URI)
  .then(() => console.log('DB ok!'))
  .catch((err) => console.log('!!!error connect DB!!!', err));

const app = express();

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api', userRouters);
app.use('/api', postsRouters);
app.use('/api', imageUploadRouter);
app.use('/api', commentsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})

export default app; 