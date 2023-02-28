import {AppError} from '../utils/app-errors';

import MediaRepository from '../DataAccessLayer/media.repository';

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

  async getImages({
    filter,
    page,
    sort,
  }: {
    page?: Page;
    sort?: Sort;
    include?: Include;
    fields?: Fields;
    filter?: Filter<Media>;
  }) {
    const medias = await mediaRepository.findMedias({filter, page, sort});

    if (!medias) {
      throw AppError.NoContent('No medias');
    }

    return medias;
  }

  async updateEntityMedias(update: any, mediaIds: MediaId[]) {
    if (mediaIds.length === 0) {
      // TODO: Maybe need to throw Error
      return [];
    }
    const medias = await mediaRepository.updateEntityMedias(update, mediaIds);
    return medias;
  }
}

export default MediaUseCases;
