import { startServer } from '../index.js';
import mongoose from 'mongoose';

let server; //для возможности закрытия соединения

// Запуск сервера в для тестов
beforeAll(async () => {
  server = await startServer();
});

/**
 * Закрытие сервера и соединения с MongoDB после всех тестов.
 * @param {Function} done - Функция обратного вызова для уведомления Jest о завершении.
 */
afterAll((done) => {
  server.close(() => {
    console.log('!!Server closed!!');

    mongoose.connection
      .close()
      .then(() => {
        console.log('!!MongoDB connection closed!!');
        done();
      })
      .catch((error) => {
        console.error('Error closing MongoDB connection:', error);
        done();
      });
  });
});

// it('Получение списка всех пользователей, путь: /api/user', async () => {
//   const response = await request(app).get('/api/user');
//   expect(response.statusCode).toBe(200);
// });