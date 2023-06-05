import { NextFunction, type Request, type Response } from 'express';
import {
  RequestStatus,
  RequestWrapper,
  Schema,
} from '@webonjour/util-interface';
import { z } from 'zod';
import { Question } from '@prisma/client';
import AppError from '../utils/appError';
import prisma from '../utils/connectDB';

export const createQuestionHandler = async (
  req: Request<
    unknown,
    unknown,
    z.infer<typeof Schema.QuestionCreateInputSchema>,
    unknown
  >,
  res: Response<RequestWrapper<Question>>,
  next: NextFunction
): Promise<void> => {
  try {
    const question = await prisma.question.create({
      data: req.body,
    });
    res.status(201).send({
      data: question,
      message: 'Create question successful',
      status: RequestStatus.SUCCESS,
    });
  } catch (err) {
    next(err);
  }
};

export const getQuestionByIdHandler = async (
  req: Request<
    z.infer<typeof Schema.QuestionWhereUniqueInputSchema>,
    unknown,
    unknown,
    unknown
  >,
  res: Response<RequestWrapper<Question>>,
  next: NextFunction
): Promise<void> => {
  try {
    const question = await prisma.question.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        answers: true,
        clues: true,
      },
    });
    if (!question) {
      return next(new AppError('Question not found', 404));
    }
    res.status(200).send({
      data: question,
      message: 'Get question by id successful',
      status: RequestStatus.SUCCESS,
    });
  } catch (err) {
    next(err);
  }
};

export const updateQuestionHandler = async (
  req: Request<
    z.infer<typeof Schema.QuestionWhereUniqueInputSchema>,
    unknown,
    z.infer<typeof Schema.QuestionUpdateInputSchema>,
    unknown
  >,
  res: Response<RequestWrapper<Question>>,
  next: NextFunction
): Promise<void> => {
  try {
    const question = await prisma.question.update({
      where: {
        id: req.params.id,
      },
      data: req.body,
      include: {
        answers: true,
        clues: true,
      },
    });
    if (!question) {
      return next(new AppError('Question not found', 404));
    }
    res.status(200).send({
      data: question,
      message: 'Update question successful',
      status: RequestStatus.SUCCESS,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteQuestionHandler = async (
  req: Request<
    z.infer<typeof Schema.QuestionWhereUniqueInputSchema>,
    unknown,
    unknown,
    unknown
  >,
  res: Response<RequestWrapper<Question>>,
  next: NextFunction
): Promise<void> => {
  try {
    const question = await prisma.question.delete({
      where: {
        id: req.params.id,
      },
      include: {
        answers: true,
        clues: true,
      },
    });
    if (!question) {
      return next(new AppError('Question not found', 404));
    }
    res.status(200).send({
      data: question,
      message: 'Delete question successful',
      status: RequestStatus.SUCCESS,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllQuestionHandler = async (
  req: Request<
    unknown,
    unknown,
    unknown,
    z.infer<typeof Schema.QuestionWhereInputSchema>
  >,
  res: Response<RequestWrapper<Question[]>>,
  next: NextFunction
): Promise<void> => {
  try {
    const questions = await prisma.question.findMany({
      where: req.query,
      include: {
        answers: true,
        clues: true,
      },
    });
    res.status(200).send({
      data: questions,
      message: 'Get all question successful',
      status: RequestStatus.SUCCESS,
    });
  } catch (err) {
    next(err);
  }
};
