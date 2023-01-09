import knexdb from '../config/database';
import logger from '../utils/logger';
import {Media} from '../@types/media';

const MEDIA_TABLE = 'media';

class MediaRepository {
  async createMedia(fields: Omit<Media, 'mediaId'>) {
    try {
      const medias = await knexdb(MEDIA_TABLE).insert(fields).returning('*');

      return medias[0];
    } catch (e) {
      logger.error('DB ERROR', e);
      throw e;
    }
  }
  async createMedias(fields: Omit<Media, 'mediaId'>[]) {
    try {
      const medias = await knexdb(MEDIA_TABLE).insert(fields).returning('*');

      return medias[0];
    } catch (e) {
      logger.error('DB ERROR', e);
      throw e;
    }
  }
}

export default MediaRepository;
