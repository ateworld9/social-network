import {NextFunction, Request, Response} from 'express';
import {AppError} from '../../utils/app-errors';

import PostsUseCases from '../../DomainLayer/posts.use-cases';

class PostsController {
  async getPosts(req: Request, res: Response, next: NextFunction) {
    try {
      // const include = req.query.include as unknown as Include | undefined;
      // const fields = req.query.include as unknown as Fields | undefined;
      const sort = req.query.include as unknown as Fields | undefined;
      const page = req.query.page as unknown as Page | undefined;
      const filter = req.query.filter as unknown as Filter | undefined;

      const data = await PostsUseCases.getPostsByQuery({sort, page, filter});

      return res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  }

  async createPost(req: Request, res: Response, next: NextFunction) {
    try {
      const {userId, text, mediaIds} = req.body;
      const {posts, relationships} = await PostsUseCases.createPost(
        userId,
        text,
        mediaIds,
      );

      if (!posts[0]) {
        next(AppError.InternalError('no post in controller'));
      }

      return res.status(201).json({posts: posts, relationships}); // STATUS CODE 201: CREATED
    } catch (e) {
      next(e);
    }
  }
}

export default PostsController;
