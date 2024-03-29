import {Router} from 'express';

import CommentController from './controller';

const router = Router();

const commentController = new CommentController();

router.post('/comments', commentController.createComment);

export default router;
