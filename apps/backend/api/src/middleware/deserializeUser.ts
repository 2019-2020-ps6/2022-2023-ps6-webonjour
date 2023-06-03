import { type NextFunction, type Request, type Response } from 'express';
import AppError from '../utils/appError';
import { verifyJwt } from '../utils/jwt';
import { Auth } from '@webonjour/util-interface';
import prisma from '../utils/connectDB';
import { Prisma } from '@prisma/client';

export const deserializeUser = async (
  req: Request<Prisma.UserWhereUniqueInput, unknown, unknown, unknown>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Get the token
    let accessToken: string | null = null;
    if (req.headers.authorization?.startsWith('Bearer') === true) {
      accessToken = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.access_token != null) {
      accessToken = req.cookies.access_token;
    }

    if (accessToken == null) {
      next(new AppError('You are not logged in', 401));
      return;
    }

    // Validate Access Token
    const decoded = verifyJwt<Auth.JWTPayload>(accessToken);

    if (decoded == null) {
      next(new AppError("Invalid token or user doesn't exist", 401));
      return;
    }

    // Check if user still exist
    const user = await prisma.user.findFirst({
      where: {
        ...req.params,
      },
    });

    if (user == null) {
      next(new AppError('User with that token no longer exist', 401));
      return;
    }

    // This is really important (Helps us know if the user is logged in from other controllers)
    // You can do: (req.user or res.locals.user)
    res.locals.user = decoded;

    next();
  } catch (err: unknown) {
    next(err);
  }
};
