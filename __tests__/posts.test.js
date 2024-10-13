import request from 'supertest';

import app from '../index.js';
import * as testData from '../test-setup/testData.js';
import '../test-setup/setupTests.js';

let postId;
let firstComment;
let secondComment;
let firstCommentId;
let secondCommentId;

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

  it('Получение созданной стати по тегу', async () => {
    const searchTag = encodeURIComponent('тестов');
    const response = await request(app)
      .get(`/api/post/search/tags?tag=${searchTag}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('posts');
    expect(response.body).toHaveProperty('success', true);
  });

  it('Получение созданной стати', async () => {
    const response = await request(app)
      .get(`/api/post/${postId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('success', true);
  });

  it('Создание и получение всех комментариев к созданной статье', async () => {
    firstComment = await request(app)
      .post(`/api/comment/${postId}`)
      .set('Authorization', `Bearer ${testData.token}`)
      .send({ text: testData.textCommentsObjData.textOunComments });
    firstCommentId = firstComment.body.comment._id;

    secondComment = await request(app)
      .post(`/api/comment/${postId}`)
      .set('Authorization', `Bearer ${testData.token}`)
      .send({ text: testData.textCommentsObjData.textTwoComments });
    secondCommentId = secondComment.body.comment._id;

    const response = await request(app)
      .get(`/api/post/${postId}/comments`)

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('message', 'все комментарии к посту');
    expect(response.body.commentsInPost).toHaveLength(2);
    expect(response.body.commentsInPost[0]).toHaveProperty(
      'text',
      testData.textCommentsObjData.textOunComments
    );
    expect(response.body.commentsInPost[1]).toHaveProperty(
      'text',
      testData.textCommentsObjData.textTwoComments
    );
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

  it('Удаление созданной статьи со всеми комментариями к ней', async () => {
    const getPost = await request(app)
      .get(`/api/post/${postId}`);

    const postTitle = getPost.body.doc.title; // Получаем заголовок

    const response = await request(app)
      .delete(`/api/post/${postId}`)
      .set('Authorization', `Bearer ${testData.token}`)
      .send({ userId: testData.testUserId });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty(
      'message',
      `Статья с ID ${postId} и заголовком ${postTitle} 
                успешно удалена со всеми комментариями`,);

    const checkResponse = await request(app)
      .get(`/api/post/${postId}`)
    expect(checkResponse.statusCode).toBe(404);

    const checkFirstCommentTest = await request(app)
      .get(`/api/comment/${firstCommentId}`);
    expect(checkFirstCommentTest.statusCode).toBe(404);
    expect(checkFirstCommentTest.body).toHaveProperty('success', false);
    expect(checkFirstCommentTest.body).toHaveProperty('message', 'Комментарий не найден');

    const checkSecondCommentTest = await request(app)
      .get(`/api/comment/${secondCommentId}`);
    expect(checkSecondCommentTest.statusCode).toBe(404);
    expect(checkSecondCommentTest.body).toHaveProperty('success', false);
    expect(checkSecondCommentTest.body).toHaveProperty('message', 'Комментарий не найден');
  });
});