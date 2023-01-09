import {NextFunction, Request, Response} from 'express-serve-static-core';
import {AppError} from '../../utils/app-errors';
import UsersUseCases from '../../DomainLayer/users.use-cases';
import {validationResult} from 'express-validator';
// import {validationResult} from 'express-validator';

const userUseCases = new UsersUseCases();

class UsersController {
  // TODO:
  async createUser(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(AppError.BadRequest('Ошибка при валидации', errors));
    }
    try {
      const {email, password} = req.body;

      const user = await userUseCases.createUser(email, password);

      res.status(201).json(user);
    } catch (e) {
      next(e);
    }
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
  async getUserByQuery(req: Request, res: Response, next: NextFunction) {
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

  async getUsersByQuery(req: Request, res: Response, next: NextFunction) {
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

export default UsersController;
