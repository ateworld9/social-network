import {NextFunction, Request, Response} from 'express';
import {AppError} from '../../utils/app-errors';
import PostsUseCases from '../../DomainLayer/posts.use-cases';
import {Post} from '../../@types/post';

const postsUseCases = new PostsUseCases();

class PostsController {
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

      return res.status(200).json({
        data: posts,
        // meta:
      });
    } catch (e) {
      next(e);
    }
  }

  async createPost(req: Request, res: Response, next: NextFunction) {
    try {
      //TODO: RESEND IMAGES ?
      console.log('REQBODY', req.body);

      const {userId, text, mediaIds} = req.body;
      const post = await postsUseCases.createPost(userId, text, mediaIds);

      if (!post) {
        next(AppError.InternalError('no post in controller'));
      }

      return res.status(201).json(post); // STATUS CODE 201: CREATED
    } catch (e) {
      next(e);
    }
  }
}

export default PostsController;
