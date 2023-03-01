import {Router} from 'express';
import {body} from 'express-validator';
import {oneOf} from 'express-validator/src/middlewares/one-of';
import AuthMiddleware from '../../middleware/auth';
import AuthController from './controller';

const router = Router();

const authController = new AuthController();

router.post(
  '/api/registration',
  body('email', 'Incorrect email').isEmail(),
  body('password').isLength({min: 8, max: 32}),
  authController.registration,
);
router.post(
  '/api/login',
  oneOf([
    body('email', 'Incorrect email').isEmail(),
    body('username', 'Incorrect username').isLength({min: 1}),
    // body('phone').isMobilePhone('ru-RU'),
  ]),
  body('password').isLength({min: 8, max: 32}),
  authController.login,
);
router.post('/api/logout', AuthMiddleware, authController.logout);
router.get('/api/refresh', authController.refresh);
// router.get('/api/activate/:link', authController);
// router.post('/api/recover-password', authController)

export default router;
