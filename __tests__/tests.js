import app from '../index.js';
import request from "supertest";

describe('API Tests', () => {
  it('должен быть ответ 200 на GET /api/user', async () => {
    const response = await request(app).get('/api/user');
    expect(response.statusCode).toBe(200);
  });
});