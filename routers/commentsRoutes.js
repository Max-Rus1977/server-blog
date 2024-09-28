import express from "express";
import { postCreateValidator, postUpdateValidator } from '../validations/index.js';
import checkAuth from "../utils/checkAuth.js";
import checkPostOwnership from "../utils/checkPostOwnership.js";
import checkValidationResult from "../utils/checkValidationResult.js";
import * as CommentController from '../controllers/CommentControllers.js';
import checkValidId from "../utils/checkValidId.js";

import verificationError from '../utils/verificationError.js';

const router = express.Router();

router.get('/comment', CommentController.getAll);
router.delete('/comment/:id', CommentController.remove);
router.post('/comment/:id', checkAuth, checkValidId(), CommentController.create);

export default router;