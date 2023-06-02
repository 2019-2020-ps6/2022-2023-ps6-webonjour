import express from 'express';
import {
  loginHandler,
  refreshTokenHandler,
  registerHandler,
} from '../controllers/auth.controller';
import { validate, validateSplit } from '../middleware/validate';
import { Auth } from '@webonjour/util-interface';
import asyncHandler from 'express-async-handler';

const router = express.Router();

// Register user route
router.post(
  '/register',
  validateSplit(undefined, undefined, Auth.registerUserSchema),
  asyncHandler(registerHandler)
);

// Login user route
router.post(
  '/login',
  validateSplit(undefined, undefined, Auth.loginUserSchema),
  asyncHandler(loginHandler)
);

router.post(
  '/refresh',
  validateSplit(undefined, undefined, Auth.refreshTokenSchema),
  asyncHandler(refreshTokenHandler)
);

export default router;
