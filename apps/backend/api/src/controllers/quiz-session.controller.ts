import { NextFunction, type Request, type Response } from 'express';
import {
  RequestStatus,
  RequestWrapper,
  Schema,
} from '@webonjour/util-interface';
import { z } from 'zod';
import { QuizSession } from '@prisma/client';
import AppError from '../utils/appError';
import prisma from '../utils/connectDB';

export const createQuizSessionHandler = async (
  req: Request<
    unknown,
    unknown,
    z.infer<typeof Schema.QuizSessionCreateInputSchema>,
    unknown
  >,
  res: Response<RequestWrapper<QuizSession>>,
  next: NextFunction
): Promise<void> => {
  try {
    const quizSession = await prisma.quizSession.create({
      data: req.body,
    });
    res.status(201).send({
      data: quizSession,
      message: 'Create quizSession successful',
      status: RequestStatus.SUCCESS,
    });
  } catch (err) {
    next(err);
  }
};

export const getQuizSessionByIdHandler = async (
  req: Request<
    z.infer<typeof Schema.QuizSessionWhereUniqueInputSchema>,
    unknown,
    unknown,
    unknown
  >,
  res: Response<RequestWrapper<QuizSession>>,
  next: NextFunction
): Promise<void> => {
  try {
    const quizSession = await prisma.quizSession.findUnique({
      where: {
        id: req.params.id,
      },
    });
    if (!quizSession) {
      return next(new AppError('QuizSession not found', 404));
    }
    res.status(200).send({
      data: quizSession,
      message: 'Get quizSession by id successful',
      status: RequestStatus.SUCCESS,
    });
  } catch (err) {
    next(err);
  }
};

export const updateQuizSessionHandler = async (
  req: Request<
    z.infer<typeof Schema.QuizSessionWhereUniqueInputSchema>,
    unknown,
    z.infer<typeof Schema.QuizSessionUpdateInputSchema>,
    unknown
  >,
  res: Response<RequestWrapper<QuizSession>>,
  next: NextFunction
): Promise<void> => {
  try {
    const quizSession = await prisma.quizSession.update({
      where: {
        id: req.params.id,
      },
      data: req.body,
    });
    if (!quizSession) {
      return next(new AppError('QuizSession not found', 404));
    }
    res.status(200).send({
      data: quizSession,
      message: 'Update quizSession successful',
      status: RequestStatus.SUCCESS,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteQuizSessionHandler = async (
  req: Request<
    z.infer<typeof Schema.QuizSessionWhereUniqueInputSchema>,
    unknown,
    unknown,
    unknown
  >,
  res: Response<RequestWrapper<QuizSession>>,
  next: NextFunction
): Promise<void> => {
  try {
    const quizSession = await prisma.quizSession.delete({
      where: {
        id: req.params.id,
      },
    });
    if (!quizSession) {
      return next(new AppError('QuizSession not found', 404));
    }
    res.status(200).send({
      data: quizSession,
      message: 'Delete quizSession successful',
      status: RequestStatus.SUCCESS,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllQuizSessionHandler = async (
  req: Request<
    unknown,
    unknown,
    unknown,
    z.infer<typeof Schema.QuizSessionWhereInputSchema>
  >,
  res: Response<RequestWrapper<QuizSession[]>>,
  next: NextFunction
): Promise<void> => {
  try {
    const quizSessions = await prisma.quizSession.findMany({
      where: req.query,
    });
    res.status(200).send({
      data: quizSessions,
      message: 'Get all quizSession successful',
      status: RequestStatus.SUCCESS,
    });
  } catch (err) {
    next(err);
  }
};
