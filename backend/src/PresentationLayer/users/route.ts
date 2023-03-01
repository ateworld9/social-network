import {Router} from 'express';
import {body, param, query} from 'express-validator';
import AuthMiddleware from '../../middleware/auth';

import UsersController from './controller';

const router = Router();
const usersController = new UsersController();

router.get(
  '/users/:userId',
  param('userId', 'userId must be numeric').isNumeric(),
  usersController.getUserById,
);
router.get(
  '/users',
  query('page.limit', 'page[limit] must be numeric').isNumeric(),
  query('page.offset', 'page[offset] must be numeric').isNumeric(),
  usersController.getUsersByQuery,
);

// TODO:
// router.patch('/users/:userId', AuthMiddleware, param('userId', 'userId must be numeric').isNumeric(), body('',''), userController.patchUser)
// router.delete('/users/:userId', AuthMiddleware, param('userId', 'userId must be numeric').isNumeric(), userController.deleteUser);
// maybe //router.post('/users', userController.createUser)

router.get(
  '/contacts/:userId',
  param('userId', 'userId must be numeric').isNumeric(),
  usersController.getUserContacts,
);
router.post(
  '/contacts',
  AuthMiddleware,
  body('currentUserId').isNumeric(),
  body('addedUserId').isNumeric(),
  usersController.addUserToContacts,
);

export default router;
