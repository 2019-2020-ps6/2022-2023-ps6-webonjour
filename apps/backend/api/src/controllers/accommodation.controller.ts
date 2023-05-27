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
