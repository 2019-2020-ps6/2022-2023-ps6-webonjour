import { NextFunction, Request, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ParsedQuery = any;

interface Options {
  parseNull?: boolean;
  parseUndefined?: boolean;
  parseBoolean?: boolean;
  parseNumber?: boolean;
}

export const parse = (target: ParsedQuery, options: Options): ParsedQuery => {
  switch (typeof target) {
    case 'string':
      if (target === '') {
        return '';
      } else if (options.parseNull && target === 'null') {
        return null;
      } else if (options.parseUndefined && target === 'undefined') {
        return undefined;
      } else if (
        options.parseBoolean &&
        (target === 'true' || target === 'false')
      ) {
        return target === 'true';
      } else if (options.parseNumber && !isNaN(Number(target))) {
        return Number(target);
      } else {
        return target;
      }
    case 'object':
      if (Array.isArray(target)) {
        return target.map((x) => parse(x, options));
      } else {
        const obj = target;
        Object.keys(obj).map((key) => (obj[key] = parse(target[key], options)));
        return obj;
      }
    default:
      return target;
  }
};

const defaultOptions: Options = {
  parseNull: true,
  parseUndefined: true,
  parseBoolean: true,
  parseNumber: true,
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const queryParser =
  (options?: Options) => (req: Request, res: Response, next: NextFunction) => {
    if (options == null) {
      options = defaultOptions;
    }
    req.query = parse(req.query, options);
    next();
  };

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const paramsParser =
  (options?: Options) => (req: Request, res: Response, next: NextFunction) => {
    if (options == null) {
      options = defaultOptions;
    }
    req.params = parse(req.params, options);
    next();
  };
