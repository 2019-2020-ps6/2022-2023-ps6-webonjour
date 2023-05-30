import { NextFunction, type Request, type Response } from 'express';
import {
  RequestStatus,
  RequestWrapper,
  Schema,
} from '@webonjour/util-interface';
import { z } from 'zod';
import { Accommodation } from '@prisma/client';
import AppError from '../utils/appError';
import prisma from '../utils/connectDB';

export const getAllAccommodationHandler = async (
  req: Request<
    unknown,
    unknown,
    unknown,
    z.infer<typeof Schema.AccommodationWhereInputSchema>
  >,
  res: Response<RequestWrapper<Accommodation[]>>,
  next: NextFunction
): Promise<void> => {
  try {
    const accommodations = await prisma.accommodation.findMany({
      where: req.query,
    });
    res.status(200).send({
      data: accommodations,
      message: 'Get all accommodation successful',
      status: RequestStatus.SUCCESS,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteAccommodationHandler = async (
  req: Request<
    z.infer<typeof Schema.AccommodationWhereUniqueInputSchema>,
    unknown,
    unknown,
    unknown
  >,
  res: Response<RequestWrapper<Accommodation>>,
  next: NextFunction
): Promise<void> => {
  try {
    const accommodation = await prisma.accommodation.delete({
      where: {
        id: req.params.id,
      },
    });
    if (!accommodation) {
      return next(new AppError('Accommodation not found', 404));
    }
    res.status(200).send({
      data: accommodation,
      message: 'Delete accommodation successful',
      status: RequestStatus.SUCCESS,
    });
  } catch (err) {
    next(err);
  }
};

export const updateAccommodationHandler = async (
  req: Request<
    z.infer<typeof Schema.AccommodationWhereUniqueInputSchema>,
    unknown,
    Accommodation,
    unknown
  >,
  res: Response<RequestWrapper<Accommodation>>,
  next: NextFunction
): Promise<void> => {
  try {
    const accommodation = await prisma.accommodation.update({
      where: {
        id: req.params.id,
      },
      data: req.body,
    });
    if (!accommodation) {
      return next(new AppError('Accommodation not found', 404));
    }
    res.status(200).send({
      data: accommodation,
      message: 'Update accommodation successful',
      status: RequestStatus.SUCCESS,
    });
  } catch (err) {
    next(err);
  }
};

export const getAccommodationByIdHandler = async (
  req: Request<
    z.infer<typeof Schema.AccommodationWhereUniqueInputSchema>,
    unknown,
    unknown,
    unknown
  >,
  res: Response<RequestWrapper<Accommodation>>,
  next: NextFunction
): Promise<void> => {
  try {
    const accommodation = await prisma.accommodation.findUnique({
      where: {
        id: req.params.id,
      },
    });
    if (!accommodation) {
      return next(new AppError('Accommodation not found', 404));
    }
    res.status(200).send({
      data: accommodation,
      message: 'Get accommodation by id successful',
      status: RequestStatus.SUCCESS,
    });
  } catch (err) {
    next(err);
  }
};
