import {NextFunction, Request, Response} from 'express';
import {validationResult} from 'express-validator';
import {AppError} from '../../utils/app-errors';

import UsersUseCases from '../../DomainLayer/users.use-cases';

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

  async getUsersByQuery(req: Request, res: Response, next: NextFunction) {
    try {
      const {limit, offset} = req.params;
      const users = await userUseCases.getUsersByQuery(null, +limit, +offset);
      if (!users) {
        next(AppError.NoContent('Users is not found'));
      }

      return res.status(200).json({data: users, meta: {}});
    } catch (e) {
      next(e);
    }
  }

  async getUserContacts(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(AppError.BadRequest('Ошибка при валидации', errors));
    }
    try {
      const userId = Number(req.params.userId);

      const contacts = await userUseCases.getUserContacts(userId);
      return res.status(200).json({data: contacts, meta: {}});
    } catch (e) {
      next(e);
    }
  }

  async addUserToContacts(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(AppError.BadRequest('Ошибка при валидации', errors));
    }
    try {
      const {currentUserId, addedUserId} = req.body;

      const contacts = await userUseCases.addUserToContacts(
        currentUserId,
        addedUserId,
      );

      return res.status(200).json({data: contacts, meta: {}});
    } catch (e) {
      next(e);
    }
  }
}

export default UsersController;
