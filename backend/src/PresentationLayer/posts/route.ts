import {Application} from 'express';

import PostController from './controller';

export default (app: Application) => {
  const postController = new PostController();

  // TODO: pagination query like page[size]=30&page[number]=2
  // OR курсорная пагинация ?page[published_at=1538332156]     - число дата с которой нужно подгружать, крч иди читай
  // OR курсорная пагинация ?page[limit]=10&page[offset]=0
  app.get('/posts', postController.getPosts);

  app.post('/posts', postController.createPost);
};
