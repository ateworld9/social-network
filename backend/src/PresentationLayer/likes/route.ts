import {Router} from 'express';

import LikesController from './controller';
import AuthMiddleware from '../../middleware/auth';

const router = Router();

const likesController = new LikesController();

router.post('/like', AuthMiddleware, likesController.postLike);

export default router;
