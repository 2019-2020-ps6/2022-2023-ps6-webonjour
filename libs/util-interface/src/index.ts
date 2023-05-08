export * as Auth from './lib/auth/index';
export * as Quiz from './lib/quiz/index';
export * as Patient from './lib/patient/index';
export * as Tts from './lib/tts.schema';

export enum RequestStatus {
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface RequestWrapper<RequestData> {
  data: RequestData;
  status: RequestStatus;
  message: string;
}
