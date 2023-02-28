import {Application} from 'express';

import CommentController from './controller';

export default (app: Application) => {
  const commentController = new CommentController();

  app.post('/comments', commentController.createComment);
};
