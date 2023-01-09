import {Application} from 'express';
import {body} from 'express-validator';
// import AuthMiddleware from '../../middleware/auth';

import UsersController from './controller';

export default (app: Application) => {
  const usersController = new UsersController();

  app.post(
    '/users',
    body('email').isEmail(),
    // cause i want hashed password there
    body('password').isString().isLength({min: 59}), // after hashing pass.length >= 60
    usersController.createUser,
  );

  // TODO: pagination query like page[size]=30&page[number]=2
  app.get('/users', usersController.getUsersByQuery);
  app.get('/users/:userId', usersController.getUserById);
  // TODO:
  // app.patch('/users/:userId', AuthMiddleware, userController.patchUser)
  // app.delete('/users/:userId', AuthMiddleware, userController.deleteUser);

  // Need it for authentication, cause it's dangerous to send a hashed password on every request
  // maybe disable it by cors ????
  // app.get('/usersForAuth/:userId', userController.);
};
