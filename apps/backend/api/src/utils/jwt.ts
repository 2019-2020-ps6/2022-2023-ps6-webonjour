import jwt, { type SignOptions } from 'jsonwebtoken';
import config from 'config';
import { User } from '@prisma/client';
import { Auth } from '@webonjour/util-interface';

const privateKey = config.get<string>('privateKey');
export const publicKey = config.get<string>('publicKey');
export const signJwt = <T extends Record<string, unknown>>(
  payload: T,
  options: SignOptions = {}
): string => {
  return jwt.sign(payload, privateKey, {
    ...options,
    algorithm: 'RS256',
  });
};

export const verifyJwt = <T>(token: string): T | null => {
  try {
    return jwt.verify(token, publicKey, {
      algorithms: ['RS256'],
    }) as T;
  } catch (error: unknown) {
    return null;
  }
};

// Sign Token
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const signToken = async (user: User) => {
  const payload: Auth.JWTPayload = {
    sub: user.id.toString(),
    iat: Date.now(),
    type: 'access',
    ...user,
    password: undefined,
  };
  // Sign the access token
  const accessToken = signJwt(payload, {
    expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
  });

  const refreshToken = signJwt(payload, {
    expiresIn: `${config.get<number>('refreshTokenExpiresIn')}m`,
  });

  // Return access token
  return { accessToken, refreshToken };
};
