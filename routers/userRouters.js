import express from 'express';
import { registerValidator } from '../validations/index.js';

import * as UserController from '../controllers/UserControllers.js';

import checkAuth from "../utils/checkAuth.js";
import checkValidationResult from "../utils/checkValidationResult.js";

const router = express.Router();

router.get(
  '/user',
  UserController.getAll
);

router.post(
  '/auth/register',
  registerValidator,
  checkValidationResult,
  UserController.register
);

router.post(
  '/auth/login',
  UserController.login
);

router.get(
  '/auth/my',
  checkAuth,
  UserController.getMy
);

export default router;