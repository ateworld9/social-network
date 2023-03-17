import {Request, Response, NextFunction} from 'express';

import {AppError} from '../../utils/app-errors';

import LikesUseCases from '../../DomainLayer/likes.use-cases';

class LikesController {
  async postLike(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body);

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
