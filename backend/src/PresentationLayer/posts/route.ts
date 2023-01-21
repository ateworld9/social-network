import {Application} from 'express';

import PostController from './controller';

export default (app: Application) => {
  const postController = new PostController();

  // TODO: курсорная пагинация ?page[published_at=1538332156]     - число дата с которой нужно подгружать, крч иди читай
  app.get('/posts', postController.getPosts);

  app.post('/posts', postController.createPost);
};
