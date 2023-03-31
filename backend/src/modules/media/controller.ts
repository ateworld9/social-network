import path from 'path';
import {Request, Response, NextFunction} from 'express';

import config from '../../config';
import {AppError} from '../../app-errors';

import MediaUseCases from './use-cases';

const mediaUseCases = new MediaUseCases();

class MediaController {
  async postImage(req: Request, res: Response, next: NextFunction) {
    try {
      const {filename, mimetype, size, path} = req?.file as Express.Multer.File;
      const filepath = path;

      const image = await mediaUseCases.saveImage({
        filename,
        filepath,
        mimetype,
        size: BigInt(size),
      });

      res
        .status(201)
        // 201 Created
        .json(image);
    } catch (e) {
      next(AppError.InternalError('Internal Error while uploading image', [e]));
    }
  }
  async getImageByFilename(req: Request, res: Response, next: NextFunction) {
    try {
      const {filename} = req.params;
      const fullfilepath = path.join(config.PATH_TO_IMAGES, filename);

      return res.sendFile(fullfilepath);
    } catch (e) {
      next(AppError.InternalError('Internal Error while sending image', [e]));
    }
  }
}

export default MediaController;
