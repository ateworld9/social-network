import {NextFunction, Request, Response} from 'express-serve-static-core';
import {AppError} from '../../utils/app-errors';
import AuthUseCases from '../../DomainLayer/auth.use-cases';
import {validationResult} from 'express-validator';

const authUseCases = new AuthUseCases();

const MAX_AGE = 30 * 24 * 60 * 60 * 1000;

class AuthController {
  async registration(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(AppError.BadRequest('Ошибка при валидации', errors));
    }
    try {
      const {email, password} = req.body;
      const user = await authUseCases.registration(email, password);
      res.cookie('refreshToken', user.refreshToken, {
        maxAge: MAX_AGE,
        httpOnly: true,
      });
      res.status(200).json(user);
      return;
    } catch (err) {
      next(err);
    }
  }
  async login(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(AppError.BadRequest('Ошибка при валидации', errors));
    }
    try {
      const {email, username, password} = req.body;
      const user = await authUseCases.login(password, email, username);
      res.cookie('refreshToken', user.refreshToken, {
        maxAge: MAX_AGE,
        httpOnly: true,
      });
      res.status(200).json(user);
      return;
    } catch (err) {
      next(err);
    }
  }
  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const {refreshToken} = req.cookies;
      if (!refreshToken) {
        next(AppError.UnAuthorized("no refreshToken, can't authorize"));
        return;
      }
      await authUseCases.logout(refreshToken);
      res.clearCookie('refreshToken');
      res.status(200).json({message: 'OK, logouted!'});
      return;
    } catch (err) {
      next(err);
    }
  }
  async refresh(req: Request, res: Response, next: NextFunction) {
    const {refreshToken} = req.cookies;
    if (!refreshToken) {
      next(AppError.UnAuthorized("no refreshToken, can't refresh"));
      return;
    }
    let userData;
    try {
      userData = await authUseCases.refresh(refreshToken);
    } catch (e) {
      return next(e);
    }
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: MAX_AGE,
      httpOnly: true,
    });
    res.status(200).json(userData);
    return;
  }
}

export default AuthController;
