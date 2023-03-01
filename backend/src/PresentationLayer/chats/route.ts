import {Router} from 'express';
import {body, param} from 'express-validator';
import AuthMiddleware from '../../middleware/auth';

import ChatsController from './controller';

const router = Router();

const chatsController = new ChatsController();

router.post(
  '/api/chats',
  AuthMiddleware,
  // TODO: validate body
  body('chatAttrs', 'chatAttrs must be Object').isObject(),
  body('members', 'chatAttrs must be Array of members').isArray(),
  chatsController.createChat,
);

router.get(
  '/api/chats/:userId',
  AuthMiddleware,
  param('userId', 'chatId must be numeric').isNumeric(),
  chatsController.getChatsForUserId,
);

export default router;
