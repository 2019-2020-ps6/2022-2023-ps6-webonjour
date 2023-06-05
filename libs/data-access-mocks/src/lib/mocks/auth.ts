import { Auth } from '@webonjour/util-interface';
import { User } from '@prisma/client';

export const credentials: Auth.LoginSchema = {
  email: 'email@email.com',
  password: 'password',
};

export const user: {
  profilePictureUrl: string;
  password: string;
  name: string;
  id: number;
  email: string;
} = {
  id: 1,
  name: 'John Doe',
  email: credentials.email,
  password: credentials.password,
  profilePictureUrl: 'https://source.unsplash.com/random/200x200',
};
export const response: Auth.LoginResponse = {
  accessToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1pY2hlbGxlIERvZSIsImlhdCI6MTUxNjIzOTAyMiwidHlwZSI6ImFjY2VzcyIsInByb2ZpbGVQaWN0dXJlIjoiaHR0cHM6Ly9zb3VyY2UudW5zcGxhc2guY29tL3JhbmRvbS8yMDB4MjAwIn0.18VJuKQAoZkm-7A7uroxrIULrTAFX6Ql661Y6uDw7eM',
  refreshToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1pY2hlbGxlIERvZSIsImlhdCI6MTUxNjIzOTAyMiwidHlwZSI6InJlZnJlc2giLCJwcm9maWxlUGljdHVyZSI6Imh0dHBzOi8vc291cmNlLnVuc3BsYXNoLmNvbS9yYW5kb20vMjAweDIwMCJ9.OCSFfEm-XDFRl9rdOfYMLbbuWF9ESxwbkZHgDmpZkyI',
};

export const decodedAccessToken = {
  sub: '1234567890',
  name: 'Michelle Doe',
  iat: 1516239022,
  type: 'access',
  profilePicture: 'https://source.unsplash.com/random/200x200',
};

export const decodedRefreshToken = {
  sub: '1234567890',
  name: 'Michelle Doe',
  iat: 1516239022,
  type: 'refresh',
  profilePicture: 'https://source.unsplash.com/random/200x200',
};
