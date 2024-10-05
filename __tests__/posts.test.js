import request from 'supertest';

import app from '../index.js';
import * as testData from '../test-setup/testData.js';
import '../test-setup/setupTests.js';

let postId;

describe('Posts API Tests', () => {
  it('Получение всех статей', async () => {
    const response = await request(app)
      .get('/api/post');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('success', true);
  });

  it('Создание статьи', async () => {
    const postData = {
      title: 'Заголовок статьи для тестов',
      text: 'Текст статьи для тестов',
      tags: ['тестов', 'статьи'],
      user: testData.testUserId
    }

    const response = await request(app)
      .post('/api/post')
      .set('Authorization', `Bearer ${testData.token}`)
      .send(postData);


    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('success', true);

    expect(response.body).toHaveProperty('post');
    expect(response.body.post).toHaveProperty('title');
    expect(response.body.post).toHaveProperty('text');
    expect(response.body.post).toHaveProperty('tags');
    expect(response.body.post).toHaveProperty('user');

    expect(response.body.post.title).toBe(postData.title);
    expect(response.body.post.text).toBe(postData.text);
    expect(response.body.post.tags).toEqual(postData.tags);
    expect(response.body.post.user).toBe(testData.testUserId);

    postId = response.body.post._id;
  });

  it('Получение созданной стати', async () => {
    const response = await request(app)
      .get(`/api/post/${postId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('success', true);
  });

  it('Изменение созданной статьи', async () => {
    const updatePostData = {
      title: 'Изменённый заголовок статьи для тестов',
      text: 'Изменённый текст статьи для тестов',
    }

    const response = await request(app)
      .patch(`/api/post/${postId}`)
      .set('Authorization', `Bearer ${testData.token}`)
      .send({ ...updatePostData, userId: testData.testUserId });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('success', true);

    expect(response.body).toHaveProperty('post');
    expect(response.body.post).toHaveProperty('title');
    expect(response.body.post).toHaveProperty('text');
    expect(response.body.post).toHaveProperty('user');

    expect(response.body.post.title).toBe(updatePostData.title);
    expect(response.body.post.text).toBe(updatePostData.text);
    expect(response.body.post.user).toBe(testData.testUserId);

  });

  it('Удаление созданной статьи', async () => {
    const response = await request(app)
      .delete(`/api/post/${postId}`)
      .set('Authorization', `Bearer ${testData.token}`)
      .send({ userId: testData.testUserId });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('success', true);

    const checkResponse = await request(app)
      .get(`/api/post/${postId}`)

    expect(checkResponse.statusCode).toBe(404);
  });

  // it('Получение всех комментариев к статье', async () => {

  // });
});