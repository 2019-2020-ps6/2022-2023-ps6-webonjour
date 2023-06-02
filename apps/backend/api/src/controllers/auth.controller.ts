import config from 'config';
import {
  type CookieOptions,
  type NextFunction,
  type Request,
  type Response,
} from 'express';
import AppError from '../utils/appError';
import { signToken, verifyJwt } from '../utils/jwt';
import prisma from '../utils/connectDB';
import { Auth, RequestStatus, RequestWrapper } from '@webonjour/util-interface';
import { User } from '@prisma/client';
import { comparePasswords, hashPassword } from '../utils/password';

// Cookie options
const accessTokenCookieOptions: CookieOptions = {
  expires: new Date(
    Date.now() + config.get<number>('accessTokenExpiresIn') * 60 * 1000
  ),
  maxAge: config.get<number>('accessTokenExpiresIn') * 60 * 1000,
  httpOnly: true,
  sameSite: 'lax',
};

const refreshTokenCookieOptions: CookieOptions = {
  expires: new Date(
    Date.now() + config.get<number>('refreshTokenExpiresIn') * 60 * 1000
  ),
  maxAge: config.get<number>('refreshTokenExpiresIn') * 60 * 1000,
  httpOnly: true,
  sameSite: 'lax',
};

// Only set secure to true in production
if (process.env.NODE_ENV === 'production') {
  accessTokenCookieOptions.secure = true;
}

export const registerHandler = async (
  req: Request<unknown, unknown, Auth.RegisterUserSchema>,
  res: Response<RequestWrapper<Partial<User> | null>>,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name,
        password: await hashPassword(req.body.password),
      },
    });
    res.status(201).json({
      status: RequestStatus.SUCCESS,
      data: user,
      message: 'User created successfully',
    });
  } catch (error: unknown) {
    next(error);
  }
};

export const loginHandler = async (
  req: Request<unknown, unknown, Auth.LoginSchema>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Get the user from the collection
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    // Check if user exist and password is correct
    if (
      user == null ||
      !(await comparePasswords(req.body.password, user.password))
    ) {
      next(new AppError('Invalid email or password', 401));
      return;
    }

    // Create an Access Token
    const { accessToken, refreshToken } = await signToken(user);

    // Send Access Token in Cookie
    res.cookie('accessToken', accessToken, accessTokenCookieOptions);
    res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions);

    res.cookie('logged_in', true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    // Send Access Token
    res.status(200).json({
      accessToken,
      refreshToken,
    });
  } catch (err: unknown) {
    next(err);
  }
};

export const refreshTokenHandler = async (
  req: Request<unknown, unknown, Auth.RefreshTokenSchema>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // verify the refresh token
    const decoded = verifyJwt<Auth.JWTPayload>(req.body.refreshToken);

    if (decoded == null) {
      next(new AppError('Invalid refresh token', 401));
      return;
    }
    // check if the user still exist
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });

    if (user == null) {
      next(new AppError('User does not exist', 401));
      return;
    }
    // regenerate the access token and refresh token
    const { accessToken, refreshToken } = await signToken(user);

    // Send Access Token in Cookie
    res.cookie('accessToken', accessToken, accessTokenCookieOptions);
    res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions);

    res.cookie('logged_in', true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    // Send Access Token
    res.status(200).json({
      accessToken,
      refreshToken,
    });
  } catch (err: unknown) {
    next(err);
  }
};
