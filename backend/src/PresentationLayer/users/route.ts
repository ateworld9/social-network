import {Application} from 'express';
import {body, param, query} from 'express-validator';
import AuthMiddleware from '../../middleware/auth';

import UsersController from './controller';

export default (app: Application) => {
  const usersController = new UsersController();

  app.get(
    '/users/:userId',
    param('userId', 'userId must be numeric').isNumeric(),
    usersController.getUserById,
  );
  app.get(
    '/users',
    query('page.limit', 'page[limit] must be numeric').isNumeric(),
    query('page.offset', 'page[offset] must be numeric').isNumeric(),
    usersController.getUsersByQuery,
  );

  // TODO:
  // app.patch('/users/:userId', AuthMiddleware, param('userId', 'userId must be numeric').isNumeric(), body('',''), userController.patchUser)
  // app.delete('/users/:userId', AuthMiddleware, param('userId', 'userId must be numeric').isNumeric(), userController.deleteUser);
  // maybe //app.post('/users', userController.createUser)

  app.get(
    '/contacts/:userId',
    param('userId', 'userId must be numeric').isNumeric(),
    usersController.getUserContacts,
  );
  app.post(
    '/contacts',
    AuthMiddleware,
    body('currentUserId').isNumeric(),
    body('addedUserId').isNumeric(),
    usersController.addUserToContacts,
  );
};
