import { NextFunction, ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { handleZodError } from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import { handleCastError } from '../errors/handleCastError';
import AppError from '../errors/AppError';

const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  next: NextFunction,
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong!';
  let errorMessage = err.message || 'Something went wrong!';
  let simplifyError;

  if (err instanceof ZodError) {
    simplifyError = handleZodError(err);
  } else if (err.name === 'ValidationError') {
    simplifyError = handleValidationError(err);
  } else if (err.name === 'CastError') {
    simplifyError = handleCastError(err);
  }

  statusCode = simplifyError?.statusCode;
  message = simplifyError?.message;
  errorMessage = simplifyError?.errorMessage;

  if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
  }

  return res.status(statusCode || 500).json({
    success: false,
    message,
    errorMessage,
    errorDetails: err,
    stack: err?.stack,
  });
};

export default globalErrorHandler;
