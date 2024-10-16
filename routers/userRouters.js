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
  '/auth/user/my',
  checkAuth,
  UserController.getMy
);

router.patch(
  '/user/:id',
  UserController.update
);

router.delete(
  '/user/:id',
  UserController.remove
);

export default router;