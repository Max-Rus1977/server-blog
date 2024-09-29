import app from '../index.js';
import request from 'supertest';
import '../test-setup/setupTests.js';

describe('Comments API Tests', () => {
  it('Получение всех комментариев, путь: /api/comment', async () => {
    const response = await request(app).get('/api/comment');
    expect(response.statusCode).toBe(200);
  });

});