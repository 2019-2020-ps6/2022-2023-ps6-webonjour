export interface LoginSchema {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshSchema {
  refreshToken: string;
}

export interface JWTPayload {
  sub: string;
  iat: number;
  type: string;
  profilePicture: string;
  name: string;
}
