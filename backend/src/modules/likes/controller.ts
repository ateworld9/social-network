import {Request, Response, NextFunction} from 'express';

import {AppError} from '../../app-errors';

import LikesUseCases from './use-cases';

class LikesController {
  async postLike(req: Request, res: Response, next: NextFunction) {
    try {
      const {like} = req?.body;

      const newLike = await LikesUseCases.createLike(like);

      res
        .status(201)
        // 201 Created
        .json(newLike);
    } catch (e) {
      next(AppError.InternalError('Internal Error while uploading image', [e]));
    }
  }
}

export default LikesController;
