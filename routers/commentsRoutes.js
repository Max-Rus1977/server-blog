import express from "express";
import checkAuth from "../utils/checkAuth.js";
import checkPostOwnership from "../utils/checkPostOwnership.js";
import checkValidationResult from "../utils/checkValidationResult.js";
import * as CommentController from '../controllers/CommentControllers.js';
import checkValidId from "../utils/checkValidId.js";
import checkCommentAuthor from '../utils/checkCommentAuthor.js';

import verificationError from '../utils/verificationError.js';

const router = express.Router();

router.get('/comment', CommentController.getAll);
router.post('/comment/:id', checkAuth, checkValidId(), CommentController.create);
router.patch('/comment/:id', checkAuth, checkValidId(), checkCommentAuthor, CommentController.update);
router.delete('/comment/:id', checkAuth, checkValidId(), checkCommentAuthor, CommentController.remove);

export default router;