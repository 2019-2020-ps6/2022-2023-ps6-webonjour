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

export function api_root(env: {
  production: boolean;
  back_office: { port: number; domain: string; host: string; secure: boolean };
  api: { port: number; domain: string; host: string; secure: boolean };
  front_office: { port: number; domain: string; host: string; secure: boolean };
}) {
  return `${protocol(env.api.secure)}://${env.api.domain}:${env.api.port}/api`;
}
