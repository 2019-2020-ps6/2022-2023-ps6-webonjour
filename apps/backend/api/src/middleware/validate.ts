import { type NextFunction, type Request, type Response } from 'express';
import { type AnyZodObject, ZodError, ZodType } from 'zod';

export const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        params: req.params,
        query: req.query,
        body: req.body,
      });

      next();
    } catch (err: unknown) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          status: 'validation error',
          error: err.errors,
        });
      }
      next(err);
    }
  };
export const validateSplit = (
  paramsSchema?: ZodType,
  querySchema?: ZodType,
  bodySchema?: ZodType
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      paramsSchema?.parse(req.params);
      querySchema?.parse(req.query);
      bodySchema?.parse(req.body);
      next();
    } catch (err: unknown) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          status: 'validation error',
          error: err.errors,
        });
      }
      next(err);
    }
  };
};
