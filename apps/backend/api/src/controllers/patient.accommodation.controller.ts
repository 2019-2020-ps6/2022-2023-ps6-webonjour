import { NextFunction, type Request, type Response } from 'express';
import {
  RequestStatus,
  RequestWrapper,
  Schema,
} from '@webonjour/util-interface';
import { z } from 'zod';
import { Accommodation, Patient } from '@prisma/client';
import AppError from '../utils/appError';
import prisma from '../utils/connectDB';
import { relatedAccommodationSchema } from '../routes/patient.route';

export const getRelatedAccommodationHandler = async (
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

export const addRelatedAccommodationHandler = async (
  req: Request<
    unknown,
    unknown,
    z.infer<typeof relatedAccommodationSchema>,
    unknown
  >,
  res: Response<RequestWrapper<Patient>>,
  next: NextFunction
): Promise<void> => {
  try {
    const patient = await prisma.patient.findUnique({
      where: {
        id: req.body.id,
      },
    });
    if (!patient) {
      return next(new AppError('Patient not found', 404));
    }
    const accommodation = await prisma.accommodation.findUnique({
      where: {
        id: req.body.accommodationId,
      },
    });
    if (!accommodation) {
      return next(new AppError('Accommodation not found', 404));
    }
    const result = await prisma.patient.update({
      where: {
        id: req.body.id,
      },
      data: {
        accommodations: {
          connect: {
            id: req.body.accommodationId,
          },
        },
      },
    });
    res.status(200).send({
      data: result,
      message: 'Add related accommodation successful',
      status: RequestStatus.SUCCESS,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteRelatedAccommodationHandler = async (
  req: Request<
    z.infer<typeof relatedAccommodationSchema>,
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
    const accommodation = await prisma.accommodation.findUnique({
      where: {
        id: req.params.accommodationId,
      },
    });
    if (!accommodation) {
      return next(new AppError('Accommodation not found', 404));
    }
    const result = await prisma.patient.update({
      where: {
        id: req.params.id,
      },
      data: {
        accommodations: {
          disconnect: {
            id: req.params.accommodationId,
          },
        },
      },
    });
    res.status(200).send({
      data: result,
      message: 'Delete related accommodation successful',
      status: RequestStatus.SUCCESS,
    });
  } catch (err) {
    next(err);
  }
};
