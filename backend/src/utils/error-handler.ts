import {NextFunction, Request, Response} from 'express';
import pino from 'pino';
import {AppError} from './app-errors';
import logger from './logger';

class ErrorLogger {
  constructor() {}
  async logError(err: any) {
    console.log('==================== Start Error Logger ===============');
    logger.error({
      private: true,
      level: 'error',
      message: `${new Date()}-${JSON.stringify(err)}`,
    });
    console.log('==================== End Error Logger ===============');
    // log error with Logger plugins

    return false;
  }

  isTrustError(error: Error | AppError) {
    if (error instanceof AppError) {
      return error.isOperational;
    } else {
      return false;
    }
  }
}

const ErrorHandler = async (
  err: Error | AppError,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errorLogger = new ErrorLogger();

  process.on('uncaughtException', (reason, promise) => {
    console.log(reason, 'UNHANDLED');
    throw reason; // need to take care
  });

  // process.on('uncaughtException', (error) => {
  //   errorLogger.logError(err);
  //   if (errorLogger.isTrustError(err)) {
  //     process.exit(1);
  //     //process exist // need restart
  //   }
	// 	process.exit(1)
  // });

  // console.log(err.description, '-------> DESCRIPTION')
  // console.log(err.message, '-------> MESSAGE')
  // console.log(err.name, '-------> NAME')
  if (err) {
    await errorLogger.logError(err);
    if (err instanceof AppError) {
      if (err.errorStack) {
        const errorDescription = err.errorStack;
        return res.status(err.statusCode).json({message: errorDescription});
      }
      return res.status(err.statusCode).json({message: err.message});
    } else {
      process.exit(1);
      //process exit // terriablly wrong with flow need restart
    }
  }
  next();
};

export default ErrorHandler;
