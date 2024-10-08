import express from "express";
import checkAuth from "../utils/checkAuth.js";
import * as CommentController from '../controllers/CommentControllers.js';
import checkValidId from "../utils/checkValidId.js";
import checkCommentAuthor from '../utils/checkCommentAuthor.js';
import checkCommentExists from "../utils/checkCommentExists.js";


const router = express.Router();

router.get(
  '/comment',
  CommentController.getAll
);

router.post(
  '/comment/:id',
  checkAuth,
  checkValidId(),
  CommentController.create
);

router.get(
  '/comment/:id',
  checkValidId(),
  checkCommentExists,
  CommentController.getOne
);

router.patch(
  '/comment/:id',
  checkAuth,
  checkValidId(),
  checkCommentAuthor,
  CommentController.update
);

router.delete(
  '/comment/:id',
  checkAuth,
  checkValidId(),
  checkCommentAuthor,
  CommentController.remove
);

export default router;