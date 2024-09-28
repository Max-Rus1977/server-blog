import app, { startServer } from '../index.js';
import request from "supertest";
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

let server;

describe('API Tests', () => {

  beforeAll(async () => {
    server = await startServer();
  });

  afterAll((done) => {
    server.close(() => {
      console.log('!!Server closed!!');

      mongoose.connection.close()
        .then(() => {
          console.log('!!MongoDB connection closed!!');
          done();
        })
        .catch((error) => {
          console.error('Error closing MongoDB connection:', error);
          done();
        })

    })
  });

  it('Получение списка всех пользователей путь: /api/user', async () => {
    const response = await request(app).get('/api/user');
    expect(response.statusCode).toBe(200);
  });
});