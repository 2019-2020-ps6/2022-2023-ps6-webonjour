import { NextFunction, type Request, type Response } from 'express';
import {
  RequestStatus,
  RequestWrapper,
  Schema,
} from '@webonjour/util-interface';
import { z } from 'zod';
import { QuestionResult } from '@prisma/client';
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
