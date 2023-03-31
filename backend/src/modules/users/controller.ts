import type {NextFunction, Request, Response} from 'express';

import {validationResult} from 'express-validator';
import {AppError} from '../../app-errors';

import UsersUseCases from './use-cases';

const usersUseCases = new UsersUseCases();

class UsersController {
  async getUserById(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(AppError.BadRequest('Bad Request: ValidationError', errors));
    }
    try {
      const userId = Number(req.params.userId);

      const user = await usersUseCases.findUserByQuery({filter: {userId}});

      return res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  }

  async getUsersByQuery(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(AppError.BadRequest('Bad Request: ValidationError', errors));
    }
    try {
      const page = req.query.page as unknown as Page;
      const filter = req.query.filter as unknown as Filter<User>;

      const {users, count} = await usersUseCases.findUsersByQuery({
        filter,
        page,
      });
      if (!users) {
        next(AppError.NoContent('Users is not found'));
      }

      return res.status(200).json({data: users, meta: {count}});
    } catch (e) {
      next(e);
    }
  }
  async patchUser(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(AppError.BadRequest('Bad Request: ValidationError', errors));
    }
    try {
      const userId = Number(req.params.userId);

      const {authUserId, user, avatar, cover} = req.body;

      const patchedUser = await usersUseCases.updateUser(
        userId,
        authUserId,
        user,
        avatar,
        cover,
      );

      return res.status(200).json(patchedUser);
    } catch (e) {
      next(e);
    }
  }
  // async deleteUser(req: Request, res: Response, next: NextFunction) {
  //     const errors = validationResult(req);
  //     if (!errors.isEmpty()) {
  //       return next(AppError.BadRequest('Bad Request: ValidationError', errors));
  //     }
  //     try {
  //       const userId = Number(req.params.userId);
  //       const patchedUser = await usersUseCases.updateUser(userId,status:'deleted');
  //       return patchedUser;
  //     } catch (e) {
  //       next(e);
  //     }
  // }

  async getUserContacts(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(AppError.BadRequest('Bad Request: ValidationError', errors));
    }
    try {
      const userId = Number(req.params.userId);

      const contacts = await usersUseCases.getUserContacts(userId);

      return res.status(200).json({data: contacts, meta: {}});
    } catch (e) {
      next(e);
    }
  }

  async addUserToContacts(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(AppError.BadRequest('Bad Request: ValidationError', errors));
    }
    try {
      const {currentUserId, addedUserId} = req.body;

      const contacts = await usersUseCases.addUserToContacts(
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
