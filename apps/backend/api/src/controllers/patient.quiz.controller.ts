import { type NextFunction, type Request, Response } from 'express';
import {
  Quiz,
  RequestStatus,
  RequestWrapper,
  Schema,
} from '@webonjour/util-interface';
import { Accommodation, Patient, Prisma } from '@prisma/client';
import prisma from '../utils/connectDB';
import { z } from 'zod';
import AppError from '../utils/appError';

const quizIdSchema = Schema.QuizWhereUniqueInputSchema.transform((data) => {
  return { quizId: data.id };
});
export const getAllRelatedQuizHandler = async (
  req: Request<
    z.infer<typeof Schema.PatientWhereUniqueInputSchema>,
    unknown,
    unknown,
    unknown
  >,
  res: Response<
    RequestWrapper<Prisma.QuizGetPayload<Quiz.QuizWithQuestions>[]>
  >,
  next: NextFunction
): Promise<void> => {
  try {
    const patient = await prisma.patient.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        quizzes: {
          include: {
            questions: {
              include: {
                answers: true,
                clues: true,
              },
            },
          },
        },
      },
    });
    if (!patient) {
      return next(new AppError('Patient not found', 404));
    }
    res.status(200).send({
      data: patient.quizzes,
      message: 'Get all related quiz successful',
      status: RequestStatus.SUCCESS,
    });
  } catch (err) {
    next(err);
  }
};

export const addRelatedQuizHandler = async (
  req: Request<
    z.infer<typeof Schema.PatientWhereUniqueInputSchema> &
      z.infer<typeof quizIdSchema>,
    unknown,
    unknown,
    unknown
  >,
  res: Response<RequestWrapper<Patient>>,
  next: NextFunction
): Promise<void> => {
  try {
    const patient = await prisma.patient.findUnique({
      where: {
        id: req.params.id,
      },
    });
    if (!patient) {
      return next(new AppError('Patient not found', 404));
    }
    const quiz = await prisma.quiz.findUnique({
      where: {
        id: req.params.quizId,
      },
    });
    if (!quiz) {
      return next(new AppError('Quiz not found', 404));
    }
    const patientQuiz = await prisma.patient.update({
      where: {
        id: req.params.id,
      },
      data: {
        quizzes: {
          connect: {
            id: req.params.quizId,
          },
        },
      },
    });
    res.status(201).send({
      data: patientQuiz,
      message: 'Add related quiz successful',
      status: RequestStatus.SUCCESS,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteRelatedQuizHandler = async (
  req: Request<
    z.infer<typeof Schema.PatientWhereUniqueInputSchema> &
      z.infer<typeof quizIdSchema>,
    unknown,
    unknown,
    unknown
  >,
  res: Response<RequestWrapper<Patient>>,
  next: NextFunction
): Promise<void> => {
  try {
    const patient = await prisma.patient.findUnique({
      where: {
        id: req.params.id,
      },
    });
    if (!patient) {
      return next(new AppError('Patient not found', 404));
    }
    const quiz = await prisma.quiz.findUnique({
      where: {
        id: req.params.quizId,
      },
    });
    if (!quiz) {
      return next(new AppError('Quiz not found', 404));
    }
    const patientQuiz = await prisma.patient.update({
      where: {
        id: req.params.id,
      },
      data: {
        quizzes: {
          disconnect: {
            id: req.params.quizId,
          },
        },
      },
    });
    res.status(200).send({
      data: patientQuiz,
      message: 'Delete related quiz successful',
      status: RequestStatus.SUCCESS,
    });
  } catch (err) {
    next(err);
  }
};

// related accommodation controller
export const getAllRelatedAccommodationHandler = async (
  req: Request<
    z.infer<typeof Schema.PatientWhereUniqueInputSchema>,
    unknown,
    unknown,
    unknown
  >,
  res: Response<RequestWrapper<Accommodation[]>>,
  next: NextFunction
): Promise<void> => {
  try {
    const patient = await prisma.patient.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        accommodations: true,
      },
    });
    if (!patient) {
      return next(new AppError('Patient not found', 404));
    }
    res.status(200).send({
      data: patient.accommodations,
      message: 'Get all related accommodation successful',
      status: RequestStatus.SUCCESS,
    });
  } catch (err) {
    next(err);
  }
};
