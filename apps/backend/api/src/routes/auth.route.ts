import express from 'express';
import {
  loginHandler,
  refreshTokenHandler,
  registerHandler,
} from '../controllers/auth.controller';
import { validate } from '../middleware/validate';
import { Auth } from '@webonjour/util-interface';
import asyncHandler from 'express-async-handler';

const router = express.Router();

// Register user route
router.post(
  '/register',
  validate(Auth.registerUserSchema),
  asyncHandler(registerHandler)
);

// Login user route
router.post(
  '/login',
  validate(Auth.loginUserSchema),
  asyncHandler(loginHandler)
);

router.post(
  '/refresh',
  validate(Auth.refreshTokenSchema),
  asyncHandler(refreshTokenHandler)
);

export default router;
