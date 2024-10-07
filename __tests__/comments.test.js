import request from 'supertest';

import app from '../index.js';
import * as testData from '../test-setup/testData.js';
import '../test-setup/setupTests.js';

let commentId;

describe('Comments API Tests', () => {
  it('Получение всех комментариев', async () => {
    const response = await request(app).get('/api/comment');
    expect(response.statusCode).toBe(200);
  });

  it('Создание комментария', async () => {
    const commentDataText = 'Текст тестового комментария для тестов';

    const response = await request(app)
      .post(`/api/comment/${testData.postId}`)
      .set('Authorization', `Bearer ${testData.token}`)
      .send({ text: commentDataText });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body.comment).toHaveProperty(
      'text',
      'Текст тестового комментария для тестов'
    );

    commentId = response.body.comment._id;
  });

  it('Изменение созданного комментария', async () => {
    const updateCommentsData = {
      text: 'Обновленный текст комментария для тестов',
    };

    const response = await request(app)
      .patch(`/api/comment/${commentId}`)
      .set('Authorization', `Bearer ${testData.token}`)
      .send({ text: updateCommentsData.text, userId: testData.testUserId });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body.updatedComment).toHaveProperty(
      'text',
      'Обновленный текст комментария для тестов'
    );
  });

  it('Удаление созданного комментария', async () => {
    const response = await request(app)
      .delete(`/api/comment/${commentId}`)
      .set('Authorization', `Bearer ${testData.token}`)
      .send({ userId: testData.testUserId });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('success', true);

    // Проверка, что комментарий был удален
    const checkResponse = await request(app)
      .get(`/api/comment/${commentId}`)
      .set('Authorization', `Bearer ${testData.token}`);

    expect(checkResponse.statusCode).toBe(404); // Ожидаем, что комментария больше нет
    expect(checkResponse.body).toHaveProperty('success', false);
  });
});
