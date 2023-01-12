import {NextFunction, Request, Response} from 'express-serve-static-core';
import TokenUseCases from '../DomainLayer/tokens.use-cases';
import {AppError} from '../utils/app-errors';

const tokensUseCases = new TokenUseCases();

const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authrizationHeader = req.headers.authorization;
    if (!authrizationHeader) {
      return next(AppError.UnAuthorized());
    }

    const accessToken = authrizationHeader.split(' ')[1];
    if (!accessToken) {
      return next(AppError.UnAuthorized());
    }

    const userData = tokensUseCases.validateAccessToken(accessToken);
    if (!userData) {
      return next(AppError.UnAuthorized());
    }

    // req.user = userData;
    next();
  } catch (error) {
    return next(AppError.UnAuthorized());
  }
};

export default AuthMiddleware;
