import { NextFunction, type Request, type Response } from 'express';
import {
  RequestStatus,
  RequestWrapper,
  Schema,
} from '@webonjour/util-interface';
import { z } from 'zod';
import { Clue } from '@prisma/client';
import AppError from '../utils/appError';
import prisma from '../utils/connectDB';

export const createClueHandler = async (
  req: Request<
    unknown,
    unknown,
    z.infer<typeof Schema.ClueCreateInputSchema>,
    unknown
  >,
  res: Response<RequestWrapper<Clue>>,
  next: NextFunction
): Promise<void> => {
  try {
    const clue = await prisma.clue.create({
      data: req.body,
    });
    res.status(201).send({
      data: clue,
      message: 'Create clue successful',
      status: RequestStatus.SUCCESS,
    });
  } catch (err) {
    next(err);
  }
};

export const getClueByIdHandler = async (
  req: Request<
    z.infer<typeof Schema.ClueWhereUniqueInputSchema>,
    unknown,
    unknown,
    unknown
  >,
  res: Response<RequestWrapper<Clue>>,
  next: NextFunction
): Promise<void> => {
  try {
    const clue = await prisma.clue.findUnique({
      where: {
        id: req.params.id,
      },
    });
    if (!clue) {
      return next(new AppError('Clue not found', 404));
    }
    res.status(200).send({
      data: clue,
      message: 'Get clue by id successful',
      status: RequestStatus.SUCCESS,
    });
  } catch (err) {
    next(err);
  }
};

export const updateClueHandler = async (
  req: Request<
    z.infer<typeof Schema.ClueWhereUniqueInputSchema>,
    unknown,
    z.infer<typeof Schema.ClueUpdateInputSchema>,
    unknown
  >,
  res: Response<RequestWrapper<Clue>>,
  next: NextFunction
): Promise<void> => {
  try {
    const clue = await prisma.clue.update({
      where: {
        id: req.params.id,
      },
      data: req.body,
    });
    if (!clue) {
      return next(new AppError('Clue not found', 404));
    }
    res.status(200).send({
      data: clue,
      message: 'Update clue successful',
      status: RequestStatus.SUCCESS,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteClueHandler = async (
  req: Request<
    z.infer<typeof Schema.ClueWhereUniqueInputSchema>,
    unknown,
    unknown,
    unknown
  >,
  res: Response<RequestWrapper<Clue>>,
  next: NextFunction
): Promise<void> => {
  try {
    const clue = await prisma.clue.delete({
      where: {
        id: req.params.id,
      },
    });
    if (!clue) {
      return next(new AppError('Clue not found', 404));
    }
    res.status(200).send({
      data: clue,
      message: 'Delete clue successful',
      status: RequestStatus.SUCCESS,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllClueHandler = async (
  req: Request<
    unknown,
    unknown,
    unknown,
    z.infer<typeof Schema.ClueWhereInputSchema>
  >,
  res: Response<RequestWrapper<Clue[]>>,
  next: NextFunction
): Promise<void> => {
  try {
    const clues = await prisma.clue.findMany({
      where: req.query,
    });
    res.status(200).send({
      data: clues,
      message: 'Get all clue successful',
      status: RequestStatus.SUCCESS,
    });
  } catch (err) {
    next(err);
  }
};
