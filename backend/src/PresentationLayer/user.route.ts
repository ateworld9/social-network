import {Application} from 'express';
import {body} from 'express-validator';
import {oneOf} from 'express-validator/src/middlewares/one-of';
import AuthMiddleware from '../middleware/auth';
import UserController from './user.controller';

export default (app: Application) => {
  const userController = new UserController();

  app.post(
    '/registration',
    body('email').isEmail(),
    body('password').isLength({min: 8, max: 32}),
    userController.registration,
  );
  app.post(
    '/login',
    oneOf([
      body('email', 'Неправильный email').isEmail(),
      body('username', 'Введите username').isLength({min: 1}),
      // body('phone').isMobilePhone('ru-RU'),
    ]),
    body('password').isLength({min: 8, max: 32}),
    userController.login,
  );
  app.post('/logout', AuthMiddleware, userController.logout);
  // app.get('/activate/:link', userController);
  app.get('/refresh', userController.refresh);

  // app.get('/users', userController.getAllUsers);
  app.get('/user/:userId', AuthMiddleware, userController.getUserById);
  app.get('/user', AuthMiddleware, userController.getUserByQuery);
  app.get('/users', userController.getUsersByQuery);
};
