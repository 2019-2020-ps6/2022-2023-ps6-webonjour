import { type NextFunction, type Request, Response } from 'express';
import {
  RequestStatus,
  RequestWrapper,
  Quiz,
  Schema,
} from '@webonjour/util-interface';
import { Prisma } from '@prisma/client';
import prisma from '../utils/connectDB';
import { z } from 'zod';

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
