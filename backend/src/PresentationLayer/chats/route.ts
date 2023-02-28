import {Application} from 'express';
import {body, param} from 'express-validator';
import AuthMiddleware from '../../middleware/auth';

import ChatsController from './controller';

export default (app: Application) => {
  const chatsController = new ChatsController();

  app.post(
    '/chats',
    AuthMiddleware,
    // TODO: validate body
    body('chatAttrs', 'chatAttrs must be Object').isObject(),
    body('members', 'chatAttrs must be Array of members').isArray(),
    chatsController.createChat,
  );

  app.get(
    '/chats/:userId',
    AuthMiddleware,
    param('userId', 'chatId must be numeric').isNumeric(),
    chatsController.getChatsForUserId,
  );
};
