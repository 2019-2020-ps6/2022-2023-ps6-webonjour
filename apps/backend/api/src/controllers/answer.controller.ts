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

export const createAnswerHandler = async (
  req: Request<
    unknown,
    unknown,
    z.infer<typeof Schema.AnswerCreateInputSchema>,
    unknown
  >,
  res: Response<RequestWrapper<Answer>>,
  next: NextFunction
): Promise<void> => {
  try {
    const answer = await prisma.answer.create({
      data: req.body,
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

export const getAnswerByIdHandler = async (
  req: Request<
    z.infer<typeof Schema.AnswerWhereUniqueInputSchema>,
    unknown,
    unknown,
    unknown
  >,
  res: Response<RequestWrapper<Answer>>,
  next: NextFunction
): Promise<void> => {
  try {
    const answer = await prisma.answer.findUnique({
      where: {
        id: req.params.id,
      },
    });
    if (!answer) {
      return next(new AppError('Answer not found', 404));
    }
    res.status(200).send({
      data: answer,
      message: 'Get answer by id successful',
      status: RequestStatus.SUCCESS,
    });
  } catch (err) {
    next(err);
  }
};

export const updateAnswerHandler = async (
  req: Request<
    z.infer<typeof Schema.AnswerWhereUniqueInputSchema>,
    unknown,
    z.infer<typeof Schema.AnswerUpdateInputSchema>,
    unknown
  >,
  res: Response<RequestWrapper<Answer>>,
  next: NextFunction
): Promise<void> => {
  try {
    const answer = await prisma.answer.update({
      where: {
        id: req.params.id,
      },
      data: req.body,
    });
    if (!answer) {
      return next(new AppError('Answer not found', 404));
    }
    res.status(200).send({
      data: answer,
      message: 'Update answer successful',
      status: RequestStatus.SUCCESS,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteAnswerHandler = async (
  req: Request<
    z.infer<typeof Schema.AnswerWhereUniqueInputSchema>,
    unknown,
    unknown,
    unknown
  >,
  res: Response<RequestWrapper<Answer>>,
  next: NextFunction
): Promise<void> => {
  try {
    const answer = await prisma.answer.delete({
      where: {
        id: req.params.id,
      },
    });
    if (!answer) {
      return next(new AppError('Answer not found', 404));
    }
    res.status(200).send({
      data: answer,
      message: 'Delete answer successful',
      status: RequestStatus.SUCCESS,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllAnswerHandler = async (
  req: Request<
    unknown,
    unknown,
    unknown,
    z.infer<typeof Schema.AnswerWhereInputSchema>
  >,
  res: Response<RequestWrapper<Answer[]>>,
  next: NextFunction
): Promise<void> => {
  try {
    const answers = await prisma.answer.findMany({
      where: req.query,
    });
    res.status(200).send({
      data: answers,
      message: 'Get all answer successful',
      status: RequestStatus.SUCCESS,
    });
  } catch (err) {
    next(err);
  }
};
