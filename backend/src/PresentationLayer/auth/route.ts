import {Router} from 'express';
import {body} from 'express-validator';
import {oneOf} from 'express-validator/src/middlewares/one-of';
import AuthMiddleware from '../../middleware/auth';
import AuthController from './controller';

const router = Router();

const authController = new AuthController();

router.post(
  '/registration',
  body('email', 'Incorrect email').isEmail(),
  body('password').isLength({min: 8, max: 32}),
  authController.registration,
);
router.post(
  '/login',
  oneOf([
    body('email', 'Incorrect email').isEmail(),
    body('username', 'Incorrect username').isLength({min: 1}),
    // body('phone').isMobilePhone('ru-RU'),
  ]),
  body('password').isLength({min: 8, max: 32}),
  authController.login,
);
router.post('/logout', AuthMiddleware, authController.logout);
router.get('/refresh', authController.refresh);
// router.get('/activate/:link', authController);
// router.post('/recover-password', authController)

export default router;
