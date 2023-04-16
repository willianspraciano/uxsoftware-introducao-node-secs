import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

import { AppError } from './AppError';

export function errorInterceptor(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (error instanceof AppError) {
    response.status(error.statusCode).json({
      status: 'Error',
      message: error.message,
    });
  }

  if (error instanceof ZodError) {
    return response.status(400).json({
      status: 'Validation error',
      message: error.issues,
    });
  }

  return response.status(500).json({
    status: 'Error',
    message: 'Internal Server Error',
  });
}
