import {NextFunction, Request, Response} from 'express';
import {AppError} from '../utils/app-errors';
import logger from '../utils/logger';

const ErrorMiddleware = async (
  err: Error | AppError,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  process.on('uncaughtException', (error) => {
    console.log('UNCAUGHT Error', error);
    process.exit(1);
  });

  if (err) {
    logger.error(err);
    if (err instanceof AppError) {
      return res
        .status(err.statusCode)
        .json({message: err.message, errors: err.errors});
    } else {
      logger.error(err);
      process.exit(1);
      //process exit // terriablly wrong with flow need restart
    }
  }
  next();
};

export default ErrorMiddleware;
