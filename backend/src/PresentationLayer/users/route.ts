import {Router} from 'express';
import {body, param, query} from 'express-validator';
import AuthMiddleware from '../../middleware/auth';

import UsersController from './controller';

const router = Router();
const usersController = new UsersController();

router.get(
  '/api/users/:userId',
  param('userId', 'userId must be numeric').isNumeric(),
  usersController.getUserById,
);
router.get(
  '/api/users',
  query('page.limit', 'page[limit] must be numeric').isNumeric(),
  query('page.offset', 'page[offset] must be numeric').isNumeric(),
  usersController.getUsersByQuery,
);

// TODO:
// router.patch('/api/users/:userId', AuthMiddleware, param('userId', 'userId must be numeric').isNumeric(), body('',''), userController.patchUser)
// router.delete('/api/users/:userId', AuthMiddleware, param('userId', 'userId must be numeric').isNumeric(), userController.deleteUser);
// maybe //router.post('/api/users', userController.createUser)

router.get(
  '/api/contacts/:userId',
  param('userId', 'userId must be numeric').isNumeric(),
  usersController.getUserContacts,
);
router.post(
  '/api/contacts',
  AuthMiddleware,
  body('currentUserId').isNumeric(),
  body('addedUserId').isNumeric(),
  usersController.addUserToContacts,
);

export default router;
