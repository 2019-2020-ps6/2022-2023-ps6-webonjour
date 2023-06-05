import { AnyZodObject, object, string, type TypeOf, z, ZodType } from 'zod';
import { User } from '@prisma/client';
import { UserCreateInputSchema } from '../generated-zod-schemas';

export const registerUserSchema: ZodType = (
  UserCreateInputSchema as unknown as AnyZodObject
)
  .merge(
    z.object({
      passwordConfirm: z.string(),
    })
  )
  .refine((data) => data['password'] === data['passwordConfirm']);

export const loginUserSchema = object({
  email: string({ required_error: 'Email is required' }).email(
    'Invalid email or password'
  ),
  password: string({ required_error: 'Password is required' }).min(
    8,
    'Invalid email or password'
  ),
});

export const changeUserPasswordSchema = object({
  currentPassword: string({ required_error: 'Current password is required' }),
  newPassword: string({ required_error: 'New password is required' })
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
  newPasswordConfirm: string({
    required_error: 'Please confirm your new password',
  }),
}).refine((data) => data.newPassword === data.newPasswordConfirm, {
  path: ['newPasswordConfirm'],
  message: 'Passwords do not match',
});
export const refreshTokenSchema = object({
  refreshToken: string({ required_error: 'Refresh token is required' }),
});

export type RefreshTokenSchema = TypeOf<typeof refreshTokenSchema>;
export type ChangeUserPasswordSchema = TypeOf<typeof changeUserPasswordSchema>; //TODO: Must be used in user.controller.ts
export type RegisterUserSchema = TypeOf<typeof registerUserSchema>;
export type LoginSchema = TypeOf<typeof loginUserSchema>;

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface JWTPayload
  extends Omit<User, 'password'>,
    Record<string, unknown> {
  sub: string;
  iat: number;
  type: string;
}
