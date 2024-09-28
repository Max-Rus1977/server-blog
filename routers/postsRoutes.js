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

router.get(
  '/post/:id',
  PostController.getOne
);

router.get('/post/:id/comments', PostController.getCommentsByPost);

router.post(
  '/post',
  checkAuth,
  postCreateValidator,
  checkValidationResult,
  PostController.create
);

router.delete(
  '/post/:id',
  checkAuth,
  checkPostOwnership,
  checkValidId(),
  PostController.remove
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

export default router;