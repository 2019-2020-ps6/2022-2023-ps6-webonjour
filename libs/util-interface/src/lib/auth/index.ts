export interface LoginSchema {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface JWTPayload {
  sub: string;
  name: string;
  iat: number;
  type: string;
}
