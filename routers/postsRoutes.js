import express from "express";
import { postCreateValidator, postUpdateValidator } from '../validations/index.js';
import checkAuth from "../utils/checkAuth.js";
import checkPostOwnership from "../utils/checkPostOwnership.js";
import checkValidationResult from "../utils/checkValidationResult.js";
import * as PostController from '../controllers/PostControllers.js';
import checkValidId from "../utils/checkValidId.js";

const router = express.Router();

router.get(
  '/post',
  PostController.getAll
);

router.post(
  '/post',
  checkAuth,
  postCreateValidator,
  checkValidationResult,
  PostController.create
);

router.get(
  '/post/:id',
  PostController.getOne
);

router.patch(
  '/post/:id',
  checkAuth,
  postUpdateValidator,
  checkValidationResult,
  checkValidId(),
  checkPostOwnership,
  PostController.update
);

router.delete(
  '/post/:id',
  checkAuth,
  checkPostOwnership,
  checkValidId(),
  PostController.remove
);

router.get(
  '/post/:id/comments',
  // Проверка авторизации пользователя и принадлежности поста к автору
  // Временно отключены для тестирования доступа к комментариям всем пользователям
  // checkAuth, // Проверка, авторизован ли пользователь
  // checkPostOwnership, // Проверка, является ли текущий пользователь автором поста
  checkValidId(),
  PostController.getCommentsByPost
);

export default router;