import { NextFunction, type Request, type Response } from 'express';
import {
  RequestStatus,
  RequestWrapper,
  Schema,
} from '@webonjour/util-interface';
import { z } from 'zod';
import { Answer } from '@prisma/client';
import AppError from '../utils/appError';
import prisma from '../utils/connectDB';
import { answerSchema } from '../routes/answer.route';

export const createAnswerHandler = async (
  req: Request<z.infer<typeof answerSchema>, unknown, unknown, unknown>,
  res: Response<RequestWrapper<Answer>>,
  next: NextFunction
): Promise<void> => {
  try {
    const answer = await prisma.answer.create({
      data: {
        ...req.body,
      },
    });
    res.status(201).send({
      data: answer,
      message: 'Create answer successful',
      status: RequestStatus.SUCCESS,
    });
  } catch (err) {
    next(err);
  }
};
