export * from './lib/environment';

export function protocol(secure: boolean) {
  return secure ? 'https' : 'http';
}
