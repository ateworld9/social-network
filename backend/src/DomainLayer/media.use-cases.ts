import {AppError} from '../utils/app-errors';

import MediaRepository from '../DataAccessLayer/media.repository';
import {Media} from '../@types/media';

const mediaRepository = new MediaRepository();

class MediaUseCases {
  async saveImage({
    filename,
    filepath,
    mimetype,
    size,
  }: Omit<Media, 'mediaId'>) {
    const media = await mediaRepository.createMedia({
      filename,
      filepath,
      mimetype,
      size,
    });

    if (!media) {
      throw AppError.InternalError("Can't save image meta to database");
    }

    return media;
  }

  async saveImages(imagesArray: Omit<Media, 'mediaId'>[]) {
    const medias = await mediaRepository.createMedias(imagesArray);

    if (!medias) {
      throw AppError.InternalError("Can't save image meta to database");
    }

    return medias;
  }
}

export default MediaUseCases;
