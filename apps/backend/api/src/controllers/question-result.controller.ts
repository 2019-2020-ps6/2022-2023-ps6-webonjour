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

export const createQuestionResultHandler = async (
  req: Request<
    unknown,
    unknown,
    z.infer<typeof Schema.QuestionResultCreateInputSchema>,
    unknown
  >,
  res: Response<RequestWrapper<QuestionResult>>,
  next: NextFunction
): Promise<void> => {
  try {
    const questionResult = await prisma.questionResult.create({
      data: req.body,
    });
    res.status(201).send({
      data: questionResult,
      message: 'Create questionResult successful',
      status: RequestStatus.SUCCESS,
    });
  } catch (err) {
    next(err);
  }
};

export const getQuestionResultByIdHandler = async (
  req: Request<
    z.infer<typeof Schema.QuestionResultWhereUniqueInputSchema>,
    unknown,
    unknown,
    unknown
  >,
  res: Response<RequestWrapper<QuestionResult>>,
  next: NextFunction
): Promise<void> => {
  try {
    const questionResult = await prisma.questionResult.findUnique({
      where: {
        id: req.params.id,
      },
    });
    if (!questionResult) {
      return next(new AppError('QuestionResult not found', 404));
    }
    res.status(200).send({
      data: questionResult,
      message: 'Get questionResult by id successful',
      status: RequestStatus.SUCCESS,
    });
  } catch (err) {
    next(err);
  }
};

export const updateQuestionResultHandler = async (
  req: Request<
    z.infer<typeof Schema.QuestionResultWhereUniqueInputSchema>,
    unknown,
    z.infer<typeof Schema.QuestionResultUpdateInputSchema>,
    unknown
  >,
  res: Response<RequestWrapper<QuestionResult>>,
  next: NextFunction
): Promise<void> => {
  try {
    const questionResult = await prisma.questionResult.update({
      where: {
        id: req.params.id,
      },
      data: req.body,
    });
    if (!questionResult) {
      return next(new AppError('QuestionResult not found', 404));
    }
    res.status(200).send({
      data: questionResult,
      message: 'Update questionResult successful',
      status: RequestStatus.SUCCESS,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteQuestionResultHandler = async (
  req: Request<
    z.infer<typeof Schema.QuestionResultWhereUniqueInputSchema>,
    unknown,
    unknown,
    unknown
  >,
  res: Response<RequestWrapper<QuestionResult>>,
  next: NextFunction
): Promise<void> => {
  try {
    const questionResult = await prisma.questionResult.delete({
      where: {
        id: req.params.id,
      },
    });
    if (!questionResult) {
      return next(new AppError('QuestionResult not found', 404));
    }
    res.status(200).send({
      data: questionResult,
      message: 'Delete questionResult successful',
      status: RequestStatus.SUCCESS,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllQuestionResultHandler = async (
  req: Request<
    unknown,
    unknown,
    unknown,
    z.infer<typeof Schema.QuestionResultWhereInputSchema>
  >,
  res: Response<RequestWrapper<QuestionResult[]>>,
  next: NextFunction
): Promise<void> => {
  try {
    const questionResults = await prisma.questionResult.findMany({
      where: req.query,
    });
    res.status(200).send({
      data: questionResults,
      message: 'Get all questionResult successful',
      status: RequestStatus.SUCCESS,
    });
  } catch (err) {
    next(err);
  }
};
