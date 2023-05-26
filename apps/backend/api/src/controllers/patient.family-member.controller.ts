import { NextFunction, type Request, type Response } from 'express';
import {
  RequestStatus,
  RequestWrapper,
  Schema,
} from '@webonjour/util-interface';
import { z } from 'zod';
import { FamilyMember } from '@prisma/client';
import AppError from '../utils/appError';
import prisma from '../utils/connectDB';
import { relatedFamilyMemberSchema } from '../routes/patient.route';

export const getRelatedFamilyMemberHandler = async (
  req: Request<
    z.infer<typeof Schema.PatientWhereUniqueInputSchema>,
    unknown,
    unknown,
    unknown
  >,
  res: Response<RequestWrapper<FamilyMember[]>>,
  next: NextFunction
): Promise<void> => {
  try {
    const patient = await prisma.patient.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        familyMembers: true,
      },
    });
    if (!patient) {
      return next(new AppError('Patient not found', 404));
    }
    res.status(200).send({
      data: patient.familyMembers,
      message: 'Get all related family member successful',
      status: RequestStatus.SUCCESS,
    });
  } catch (err) {
    next(err);
  }
};

export const addRelatedFamilyMemberHandler = async (
  req: Request<
    z.infer<typeof relatedFamilyMemberSchema>,
    unknown,
    unknown,
    unknown
  >,
  res: Response<RequestWrapper<FamilyMember>>,
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
    const familyMember = await prisma.familyMember.findUnique({
      where: {
        id: req.params.familyMemberId,
      },
    });
    if (!familyMember) {
      return next(new AppError('Family member not found', 404));
    }

    await prisma.familyMember.update({
      where: {
        id: req.params.familyMemberId,
      },
      data: {
        patients: {
          connect: {
            id: req.params.id,
          },
        },
      },
    });
    res.status(200).send({
      data: familyMember,
      message: 'Add related family member successful',
      status: RequestStatus.SUCCESS,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteRelatedFamilyMemberHandler = async (
  req: Request<
    z.infer<typeof relatedFamilyMemberSchema>,
    unknown,
    unknown,
    unknown
  >,
  res: Response<RequestWrapper<null>>,
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
    const familyMember = await prisma.familyMember.findUnique({
      where: {
        id: req.params.familyMemberId,
      },
    });
    if (!familyMember) {
      return next(new AppError('Family member not found', 404));
    }
    await prisma.familyMember.update({
      where: {
        id: req.params.familyMemberId,
      },
      data: {
        patients: {
          disconnect: {
            id: req.params.id,
          },
        },
      },
    });

    res.status(200).send({
      data: null,
      message: 'Delete related family member successful',
      status: RequestStatus.SUCCESS,
    });
  } catch (err) {
    next(err);
  }
};
