export * as Auth from './lib/auth/index';

enum RequestStatus {
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface RequestWrapper<RequestData> {
  data: RequestData;
  status: RequestStatus;
  message: string;
}
