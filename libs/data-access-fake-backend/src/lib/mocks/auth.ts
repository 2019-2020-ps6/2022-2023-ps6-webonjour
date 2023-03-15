import { Auth } from '@webonjour/util-interface';

export const credentials: Auth.LoginSchema = {
  email: 'email@email.com',
  password: 'password',
};
export const response: Auth.LoginResponse = {
  accessToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJ0eXBlIjoiYWNjZXNzIn0.SWw75nUVldk2qUs1wiTx7ZIpjPAMLuGwOnxs_NMVUJM',
  refreshToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJ0eXBlIjoicmVmcmVzaCJ9.rzQhdqE2VpiJ8mdD24FghBZ71D64CWMwQR5_c3_z-w0',
};
