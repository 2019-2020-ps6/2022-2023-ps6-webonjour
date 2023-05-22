import { type NextFunction, type Request, Response } from 'express';
import {
  Quiz,
  RequestStatus,
  RequestWrapper,
  Schema,
} from '@webonjour/util-interface';
import { Prisma } from '@prisma/client';
import prisma from '../utils/connectDB';
import { z } from 'zod';
import AppError from '../utils/appError';

export const getAllQuizHandler = async (
  req: Request<
    unknown,
    unknown,
    unknown,
    z.infer<typeof Schema.QuizWhereInputSchema>
  >,
  res: Response<
    RequestWrapper<Prisma.QuizGetPayload<Quiz.QuizWithQuestions>[]>
  >,
  next: NextFunction
): Promise<void> => {
  try {
    const quizzes = await prisma.quiz.findMany({
      where: req.query,
      include: {
        questions: {
          include: {
            answers: true,
            clues: true,
          },
        },
      },
    });
    res.status(200).send({
      data: quizzes,
      message: 'Get all quiz successful',
      status: RequestStatus.SUCCESS,
    });
  } catch (err) {
    next(err);
  }
};

export const getQuizByIdHandler = async (
  req: Request<
    z.infer<typeof Schema.QuizWhereUniqueInputSchema>,
    unknown,
    unknown,
    unknown
  >,
  res: Response<RequestWrapper<Prisma.QuizGetPayload<Quiz.QuizWithQuestions>>>,
  next: NextFunction
): Promise<void> => {
  try {
    const quiz = await prisma.quiz.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        questions: {
          include: {
            answers: true,
            clues: true,
          },
        },
      },
    });
    if (!quiz) {
      next(new AppError('Quiz not found', 404));
      return;
    }
    res.status(200).send({
      data: quiz,
      message: 'Get quiz by id successful',
      status: RequestStatus.SUCCESS,
    });
  } catch (err) {
    next(err);
  }
};

export const createQuizHandler = async (
  req: Request<unknown, unknown, Prisma.QuizCreateInput, unknown>,
  res: Response<RequestWrapper<Prisma.QuizGetPayload<Quiz.QuizWithQuestions>>>,
  next: NextFunction
): Promise<void> => {
  try {
    const quiz = await prisma.quiz.create({
      data: req.body,
      include: {
        questions: {
          include: {
            answers: true,
            clues: true,
          },
        },
      },
    });
    res.status(200).send({
      data: quiz,
      message: 'Create quiz successful',
      status: RequestStatus.SUCCESS,
    });
  } catch (err) {
    next(err);
  }
};
