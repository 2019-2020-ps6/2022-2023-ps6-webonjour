import { type NextFunction, type Request, Response } from 'express';
import { RequestStatus, RequestWrapper, Quiz } from '@webonjour/util-interface';
import { Quiz as PrismaQuiz } from '@prisma/client';
import prisma from '../utils/connectDB';

export const getAllQuiz = async (
  req: Request<
    unknown,
    unknown,
    unknown,
    Quiz.Schema.GetAllQuizSchema['query']
  >,
  res: Response<RequestWrapper<PrismaQuiz[]>>,
  next: NextFunction
): Promise<void> => {
  try {
    const quizzes = await prisma.quiz.findMany({
      where: {
        ...req.query,
      },

      include: {
        questions: {
          include: {
            answers: true,
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
