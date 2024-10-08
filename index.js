import express from 'express';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';

import fs from 'fs';
import path from 'path';

import { __dirname, __filename } from './utils/pathHelpers.js';

import userRouters from './routers/userRouters.js';
import postsRouters from './routers/postsRoutes.js';
import commentsRouter from './routers/commentsRoutes.js';
import imageUploadRouter from './routers/imageUploadRouter.js';

const app = express();
dotenv.config();

if (process.env.NODE_ENV !== 'test') {
  // Создаем поток записи в файл
  const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'access.log'),
    { flags: 'a' }
  );
  // Используем 'combined' формат для записи логов в файл
  app.use(morgan('combined', { stream: accessLogStream }));

  // Ограничение запросов
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 минут
    max: 100, // Ограничение 100 запросов
  });
  app.use(limiter); // Применить ко всем маршрутам
}

const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log('DB ok!');
  } catch (error) {
    console.log('!!!error connect DB!!!', error);
    process.exit(1); // Остановка приложения при ошибке подключения
  }
};

const startServer = async () => {
  try {
    await connectToDatabase();

    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    return server; // для тестов
  } catch (error) {
    console.error('Error starting server:', error);
  }
};

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api', userRouters);
app.use('/api', postsRouters);
app.use('/api', imageUploadRouter);
app.use('/api', commentsRouter);

// Запуск сервера, если файл выполняется напрямую для тестов
// if (require.main === module) {
//   startServer();
// }

// Запуск сервера 
startServer();

export default app; // для тестов
export { startServer }; // для тестов
