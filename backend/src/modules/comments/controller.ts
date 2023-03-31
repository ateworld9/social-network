import {NextFunction, Request, Response} from 'express';
import {AppError} from '../../app-errors';
import CommentsUseCases from './use-cases';

const commentsUseCases = new CommentsUseCases();

class CommentsController {
  async createComment(req: Request, res: Response, next: NextFunction) {
    try {
      const {postId, userId, text, mediaIds} = req.body;
      const {comments, relationships} = await commentsUseCases.createComment(
        postId,
        userId,
        text,
        mediaIds,
      );

      if (!comments[0]) {
        next(AppError.InternalError('no post in controller'));
      }

      return res.status(201).json({comments, relationships}); // STATUS CODE 201: CREATED
    } catch (e) {
      next(e);
    }
  }
}

export default CommentsController;
