import {Application} from 'express';
import AuthMiddleware from '../middleware/auth';
import UserController from './user.controller';

export default (app: Application) => {
  const userController = new UserController();

  app.post('/registration', userController.registration);
  app.post('/login', userController.login);
  app.post('/logout', AuthMiddleware, userController.logout);
  // app.get('/activate/:link', userController);
  app.get('/refresh', userController.refresh);

  // app.get('/users', userController.getAllUsers);
  app.get('/user/:userId', AuthMiddleware, userController.getUserById);
  app.get('/user', userController.getUserByQuery);
  app.get('/users', userController.getUsersByQuery);
};
