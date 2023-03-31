import {Router} from 'express';
import AuthMiddleware from '../../middleware/auth';

import PostController from './controller';

const router = Router();
const postController = new PostController();

// TODO: курсорная пагинация ?page[published_at=1538332156]     - число дата с которой нужно подгружать, крч иди читай
router.get('/posts', postController.getPosts);

router.post('/posts', AuthMiddleware, postController.createPost);

router.delete('/posts/:postId', AuthMiddleware, postController.deletePost);

export default router;
