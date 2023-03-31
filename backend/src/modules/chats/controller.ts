import type {NextFunction, Request, Response} from 'express';
import {validationResult} from 'express-validator';

import {AppError} from '../../app-errors';

import ChatsUseCases from './use-cases';

const chatUseCases = new ChatsUseCases();

class ChatsController {
  async createChat(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(AppError.BadRequest('Bad Request: ValidationError', errors));
    }

    try {
      const chatAttrs = req.body.chatAttrs as unknown as {
        chatName: Chat['chatName'];
        type: Chat['type'];
      };
      const members = req.body.members as unknown as {
        userId: UserId;
        role: string;
      }[];
      const chat = await chatUseCases.createChat(chatAttrs, members);

      res.status(200).json(chat);
    } catch (e) {
      next(e);
    }
  }

  async getChatsForUserId(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(AppError.BadRequest('Bad Request: ValidationError', errors));
    }

    try {
      const userId = req.params.userId as unknown as UserId;
      const {chats, relationships, count} =
        await chatUseCases.findChatsForUserId(userId, {
          filter: {},
          page: {limit: 100, offset: 0},
        });

      res.status(200).json({
        data: chats,
        relationships,
        meta: {
          count: count,
        },
      });
    } catch (e) {
      next(e);
    }
  }
}

export default ChatsController;
