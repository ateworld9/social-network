import {static as expressStatic, Application, Request} from 'express';
import multer, {FileFilterCallback} from 'multer';

import {param} from 'express-validator';

import {PATH_TO_IMAGES, PATH_TO_PUBLIC} from '../../config';

import MediaController from './controller';

const fileLimit = {
  fileSize: 1024 * 1024 * 10, // limits the file size to 10MB
};
const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback,
) => {
  // return error if the file type is not image
  if (!file || file.mimetype.split('/')[0] != 'image') {
    return callback(new Error('Only images allowed'));
  }
  callback(null, true);
};

const upload = multer({
  dest: PATH_TO_IMAGES,
  limits: fileLimit,
  fileFilter,
}).single('image');

export default (app: Application) => {
  const mediaController = new MediaController();

  app.use('/public', expressStatic(PATH_TO_PUBLIC));

  app.post('/image', upload, mediaController.postImage);

  app.get(
    '/images/:filename',
    param('filename').isString(),
    mediaController.getImageByFilename,
  );
};
