import {NextFunction, Request, Response} from 'express';
import {AppError} from '../app-errors';
import logger from '../logger';

const ErrorMiddleware = async (
  err: Error | AppError,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err) {
    logger.error(err);
    if (err instanceof AppError) {
      return res
        .status(err.statusCode)
        .json({message: err.message, errors: err.errors});
    } else {
      console.log(
        '==========================\n===========EXIT===========\n==========================\n',
      );
      // process.exit(1);
      //process exit // terriablly wrong with flow need restart
      return res.status(500).json({message: err.message});
    }
  }
  next();
};

export default ErrorMiddleware;
