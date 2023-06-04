import { environment as dev_env } from './lib/environment';
import { environment as prod_env } from './lib/environment.prod';

export * from './lib/environment';

export function protocol(secure: boolean) {
  return secure ? 'https' : 'http';
}

export function getEnv(mode: string) {
  switch (mode) {
    case 'production':
      return prod_env;
    case 'development':
    default:
      return dev_env;
  }
}
