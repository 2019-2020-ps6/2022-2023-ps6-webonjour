import { Auth } from '@webonjour/util-interface';

export const credentials: Auth.LoginSchema = {
  email: 'email@email.com',
  password: 'password',
};
export const response: Auth.LoginResponse = {
  accessToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1pY2hlbGxlIERvZSIsImlhdCI6MTUxNjIzOTAyMiwidHlwZSI6ImFjY2VzcyIsInByb2ZpbGVQaWN0dXJlIjoiaHR0cHM6Ly9jZG4tYWpnZ2Qubml0cm9jZG4uY29tL2tNb09GcERsc09WdGxZSkxyblNSTkNRWGFVRkhaUFRZL2Fzc2V0cy9pbWFnZXMvb3B0aW1pemVkL3Jldi00NGIwMDJiL3dwLWNvbnRlbnQvdXBsb2Fkcy9iYi1wbHVnaW4vY2FjaGUvY29vbC1wcm9maWxlLXBpYy1tYXRoZXVzLWZlcnJlcm8tbGFuZHNjYXBlLmpwZWcifQ.DTTX5qFdt03A9NTpMGTSU-HVAhkDY9SwzRIl5XWRwr0',
  refreshToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1pY2hlbGxlIERvZSIsImlhdCI6MTUxNjIzOTAyMiwidHlwZSI6InJlZnJlc2giLCJwcm9maWxlUGljdHVyZSI6Imh0dHBzOi8vY2RuLWFqZ2dkLm5pdHJvY2RuLmNvbS9rTW9PRnBEbHNPVnRsWUpMcm5TUk5DUVhhVUZIWlBUWS9hc3NldHMvaW1hZ2VzL29wdGltaXplZC9yZXYtNDRiMDAyYi93cC1jb250ZW50L3VwbG9hZHMvYmItcGx1Z2luL2NhY2hlL2Nvb2wtcHJvZmlsZS1waWMtbWF0aGV1cy1mZXJyZXJvLWxhbmRzY2FwZS5qcGVnIn0.VXJhFCxx3f5piStCo44a6MDIIfywmLc2Z4mgAtR1Stc',
};

export const decodedAccessToken = {
  sub: '1234567890',
  name: 'Michelle Doe',
  iat: 1516239022,
  type: 'access',
  profilePicture:
    'https://cdn-ajggd.nitrocdn.com/kMoOFpDlsOVtlYJLrnSRNCQXaUFHZPTY/assets/images/optimized/rev-44b002b/wp-content/uploads/bb-plugin/cache/cool-profile-pic-matheus-ferrero-landscape.jpeg',
};

export const decodedRefreshToken = {
  sub: '1234567890',
  name: 'Michelle Doe',
  iat: 1516239022,
  type: 'refresh',
  profilePicture:
    'https://cdn-ajggd.nitrocdn.com/kMoOFpDlsOVtlYJLrnSRNCQXaUFHZPTY/assets/images/optimized/rev-44b002b/wp-content/uploads/bb-plugin/cache/cool-profile-pic-matheus-ferrero-landscape.jpeg',
};
