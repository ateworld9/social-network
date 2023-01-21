import {Application} from 'express';
import {body} from 'express-validator';
import {oneOf} from 'express-validator/src/middlewares/one-of';
import AuthMiddleware from '../../middleware/auth';
import AuthController from './controller';

export default (app: Application) => {
  const authController = new AuthController();

  app.post(
    '/registration',
    body('email', 'Incorrect email').isEmail(),
    body('password').isLength({min: 8, max: 32}),
    authController.registration,
  );
  app.post(
    '/login',
    oneOf([
      body('email', 'Incorrect email').isEmail(),
      body('username', 'Incorrect username').isLength({min: 1}),
      // body('phone').isMobilePhone('ru-RU'),
    ]),
    body('password').isLength({min: 8, max: 32}),
    authController.login,
  );
  app.post('/logout', AuthMiddleware, authController.logout);
  app.get('/refresh', authController.refresh);
  // app.get('/activate/:link', authController);
  // app.post('/recover-password', authController)
};
