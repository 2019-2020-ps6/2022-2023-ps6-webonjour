import { type NextFunction, type Request, Response } from 'express';
import {
  RequestStatus,
  RequestWrapper,
  Schema,
} from '@webonjour/util-interface';
import { Patient } from '@prisma/client';
import prisma from '../utils/connectDB';
import { z } from 'zod';
import AppError from '../utils/appError';

export const getAllPatientHandler = async (
  req: Request<
    unknown,
    unknown,
    unknown,
    z.infer<typeof Schema.PatientWhereInputSchema>
  >,
  res: Response<RequestWrapper<Patient[]>>,
  next: NextFunction
): Promise<void> => {
  try {
    const patients = await prisma.patient.findMany({
      where: req.query,
    });
    res.status(200).send({
      data: patients,
      message: 'Get all patient successful',
      status: RequestStatus.SUCCESS,
    });
  } catch (err) {
    next(err);
  }
};

export const getPatientByIdHandler = async (
  req: Request<
    z.infer<typeof Schema.PatientWhereUniqueInputSchema>,
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
    res.status(200).send({
      data: patient,
      message: 'Get patient by id successful',
      status: RequestStatus.SUCCESS,
    });
  } catch (err) {
    next(err);
  }
};

export const createPatientHandler = async (
  req: Request<
    unknown,
    unknown,
    z.infer<typeof Schema.PatientCreateInputSchema>,
    unknown
  >,
  res: Response<RequestWrapper<Patient>>,
  next: NextFunction
): Promise<void> => {
  try {
    const patient = await prisma.patient.create({
      data: req.body,
    });
    res.status(201).send({
      data: patient,
      message: 'Create patient successful',
      status: RequestStatus.SUCCESS,
    });
  } catch (err) {
    next(err);
  }
};

export const updatePatientHandler = async (
  req: Request<
    z.infer<typeof Schema.PatientWhereUniqueInputSchema>,
    unknown,
    z.infer<typeof Schema.PatientUpdateInputSchema>,
    unknown
  >,
  res: Response<RequestWrapper<Patient>>,
  next: NextFunction
): Promise<void> => {
  try {
    const patient = await prisma.patient.update({
      where: {
        id: req.params.id,
      },
      data: req.body,
    });
    res.status(200).send({
      data: patient,
      message: 'Update patient successful',
      status: RequestStatus.SUCCESS,
    });
  } catch (err) {
    next(err);
  }
};

export const deletePatientHandler = async (
  req: Request<
    z.infer<typeof Schema.PatientWhereUniqueInputSchema>,
    unknown,
    unknown,
    unknown
  >,
  res: Response<RequestWrapper<Patient>>,
  next: NextFunction
): Promise<void> => {
  try {
    const patient = await prisma.patient.delete({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).send({
      data: patient,
      message: 'Delete patient successful',
      status: RequestStatus.SUCCESS,
    });
  } catch (err) {
    next(err);
  }
};
