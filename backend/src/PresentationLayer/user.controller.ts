import {NextFunction, Request, Response} from 'express-serve-static-core';
import {AppError} from '../utils/app-errors';
import UserUseCases from '../DomainLayer/user.use-cases';
import {User} from '../@types/user';
import {validationResult} from 'express-validator';

const userUseCases = new UserUseCases();

const MAX_AGE = 30 * 24 * 60 * 60 * 1000;

class UserController {
  async registration(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(AppError.BadRequest('Ошибка при валидации', errors));
    }
    try {
      const {email, password} = req.body;
      const user = await userUseCases.registration(email, password);
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
      const user = await userUseCases.login(password, email, username);
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
      await userUseCases.logout(refreshToken);
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
      userData = await userUseCases.refresh(refreshToken);
    } catch (e) {
      return next(e);
    }
    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: MAX_AGE,
      httpOnly: true,
    });
    // res.status(200).json({msg: 'OK, refreshed!'});
    res.status(200).json(userData);
    return;
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.params.userId);
      if (!userId) {
        next(AppError.BadRequest('Bad request: userId params is not passed'));
      }
      const user = await userUseCases.getUserById(userId);

      return res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  }
  async getUserByQuery(
    req: Request<
      Record<string, never>,
      Record<string, never>,
      Record<string, never>,
      Partial<User>
    >,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const user = await userUseCases.getUser(req.query);
      if (!user) {
        next(AppError.NotFound('User is not found'));
      }

      return res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  }

  async getUsersByQuery(
    req: Request<
      Record<string, never>,
      Record<string, never>,
      Record<string, never>,
      Partial<User>
    >,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const users = await userUseCases.getUsers(req.query);
      if (!users) {
        next(AppError.NotFound('Users is not found'));
      }

      return res.status(200).json(users);
    } catch (e) {
      next(e);
    }
  }
}

export default UserController;
