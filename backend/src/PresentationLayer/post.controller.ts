import {NextFunction, Request, Response} from 'express-serve-static-core';
import {AppError} from '../utils/app-errors';
import PostsUseCases from '../DomainLayer/posts.use-cases';
import {Post} from '../@types/post';

const postsUseCases = new PostsUseCases();

class PostController {
  async getPosts(
    req: Request<
      Record<string, never>,
      Record<string, never>,
      Record<string, never>,
      Partial<Post> & {limit?: number; offset?: number}
    >,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const {limit, offset, ...query} = req.query;
      const posts = await postsUseCases.getPosts(query, limit, offset);
      if (!posts) {
        next(AppError.NoContent('No posts yet'));
      }

      return res.status(200).json(posts);
    } catch (e) {
      next(e);
    }
  }
}

export default PostController;
