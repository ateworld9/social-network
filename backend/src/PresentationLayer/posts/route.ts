import {Router} from 'express';

import PostController from './controller';

const router = Router();
const postController = new PostController();

// TODO: курсорная пагинация ?page[published_at=1538332156]     - число дата с которой нужно подгружать, крч иди читай
router.get('/api/posts', postController.getPosts);

router.post('/api/posts', postController.createPost);

export default router;
