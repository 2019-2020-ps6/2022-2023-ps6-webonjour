import { type NextFunction, type Request, Response } from 'express';
import {
  RequestStatus,
  RequestWrapper,
  Schema,
} from '@webonjour/util-interface';
import { FamilyMember } from '@prisma/client';
import prisma from '../utils/connectDB';
import { z } from 'zod';
import AppError from '../utils/appError';

export const getAllFamilyMemberHandler = async (
  req: Request<
    unknown,
    unknown,
    unknown,
    z.infer<typeof Schema.FamilyMemberWhereInputSchema>
  >,
  res: Response<RequestWrapper<FamilyMember[]>>,
  next: NextFunction
): Promise<void> => {
  try {
    const familyMembers = await prisma.familyMember.findMany({
      where: req.query,
    });
    res.status(200).send({
      data: familyMembers,
      message: 'Get all family member successful',
      status: RequestStatus.SUCCESS,
    });
  } catch (err) {
    next(err);
  }
};

export const getFamilyMemberByIdHandler = async (
  req: Request<
    z.infer<typeof Schema.FamilyMemberWhereUniqueInputSchema>,
    unknown,
    unknown,
    unknown
  >,
  res: Response<RequestWrapper<FamilyMember>>,
  next: NextFunction
): Promise<void> => {
  const familyMember = await prisma.familyMember.findUnique({
    where: {
      id: req.params.id,
    },
  });
  if (!familyMember) {
    return next(new AppError('Family member not found', 404));
  }
  res.status(200).send({
    data: familyMember,
    message: 'Get family member by id successful',
    status: RequestStatus.SUCCESS,
  });
};

export const createFamilyMemberHandler = async (
  req: Request<
    unknown,
    unknown,
    z.infer<typeof Schema.FamilyMemberCreateInputSchema>,
    unknown
  >,
  res: Response<RequestWrapper<FamilyMember>>,
  next: NextFunction
): Promise<void> => {
  try {
    const familyMember = await prisma.familyMember.create({
      data: req.body,
    });
    res.status(200).send({
      data: familyMember,
      message: 'Create family member successful',
      status: RequestStatus.SUCCESS,
    });
  } catch (err) {
    next(err);
  }
};

export const updateFamilyMemberHandler = async (
  req: Request<
    z.infer<typeof Schema.FamilyMemberWhereUniqueInputSchema>,
    unknown,
    z.infer<typeof Schema.FamilyMemberUpdateInputSchema>,
    unknown
  >,
  res: Response<RequestWrapper<FamilyMember>>,
  next: NextFunction
): Promise<void> => {
  try {
    const familyMember = await prisma.familyMember.update({
      where: {
        id: req.params.id,
      },
      data: req.body,
    });
    res.status(200).send({
      data: familyMember,
      message: 'Update family member successful',
      status: RequestStatus.SUCCESS,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteFamilyMemberHandler = async (
  req: Request<
    z.infer<typeof Schema.FamilyMemberWhereUniqueInputSchema>,
    unknown,
    unknown,
    unknown
  >,
  res: Response<RequestWrapper<FamilyMember>>,
  next: NextFunction
): Promise<void> => {
  try {
    const familyMember = await prisma.familyMember.delete({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).send({
      data: familyMember,
      message: 'Delete family member successful',
      status: RequestStatus.SUCCESS,
    });
  } catch (err) {
    next(err);
  }
};
