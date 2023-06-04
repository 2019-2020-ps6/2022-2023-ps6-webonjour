import { NextFunction, type Request, type Response } from 'express';
import {
  RequestStatus,
  RequestWrapper,
  Schema,
  Patient,
} from '@webonjour/util-interface';
import { z } from 'zod';
import { Prisma, QuestionResult, Quiz, QuizSession } from '@prisma/client';
import AppError from '../utils/appError';
import prisma from '../utils/connectDB';

export const getRelatedQuestionResultHandler = async (
  req: Request<
    z.infer<typeof Schema.PatientWhereUniqueInputSchema>,
    unknown,
    unknown,
    unknown
  >,
  res: Response<RequestWrapper<QuestionResult[]>>,
  next: NextFunction
): Promise<void> => {
  try {
    const questionsResults = await prisma.questionResult.findMany({
      where: {
        quizSession: {
          patientId: req.params.id,
        },
      },
    });
    if (!questionsResults) {
      return next(new AppError('Patient not found', 404));
    }
    res.status(200).send({
      data: questionsResults,
      message: 'Get all related question result successful',
      status: RequestStatus.SUCCESS,
    });
  } catch (err) {
    next(err);
  }
};

export const getRelatedAggregatedQuestionResultHandler = async (
  req: Request<
    z.infer<typeof Schema.PatientWhereUniqueInputSchema>,
    unknown,
    unknown,
    unknown
  >,
  res: Response<RequestWrapper<Patient.AggregatedQuestionResult>>,
  next: NextFunction
): Promise<void> => {
  const questionsResults = await prisma.questionResult.findMany({
    where: {
      quizSession: {
        patientId: req.params.id,
      },
    },
  });
  if (!questionsResults) {
    return next(new AppError('Patient not found', 404));
  }
  const numberOfQuizPlayed = await prisma.quizSession.count({
    where: {
      patientId: req.params.id,
    },
  });
  const mostPlayedQuizIds = await prisma.quizSession.groupBy({
    by: ['quizId'],
    _count: {
      quizId: true,
    },
    orderBy: {
      _count: {
        quizId: 'desc',
      },
    },
    where: {
      patientId: req.params.id,
    },
  });
  let mostPlayedQuiz: Quiz | null = null;

  if (mostPlayedQuizIds.length > 0) {
    mostPlayedQuiz = await prisma.quiz.findFirst({
      where: {
        id: mostPlayedQuizIds[0].quizId,
      },
    });
  }

  const lastPlayedQuiz = await prisma.quizSession.findFirst({
    where: {
      patientId: req.params.id,
    },
    include: {
      quiz: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const averageScore = await prisma.quizSession.aggregate({
    _avg: {
      score: true,
    },
  });
  const bestQuiz = await prisma.quizSession.findFirst({
    where: {
      patientId: req.params.id,
    },
    include: {
      quiz: true,
    },
    orderBy: {
      score: 'desc',
    },
  });

  res.status(200).send({
    data: {
      numberOfQuizPlayed,
      mostPlayedQuiz,
      lastPlayedQuiz,
      averageScore,
      bestQuiz,
    },
    message: 'Get all related question result successful',
    status: RequestStatus.SUCCESS,
  });
};
