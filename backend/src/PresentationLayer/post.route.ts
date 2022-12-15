import {Application} from 'express';

import PostController from './post.controller';

export default (app: Application) => {
  const postController = new PostController();

  app.get('/posts', postController.getPosts);
};
