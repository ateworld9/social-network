import knexdb from '../../config/database';
import {TABLES} from '../../constants';

import {parseSort} from '../../utils';
import logger from '../../logger';

const DEFAULT_MEDIA_SELECT = [
  `${TABLES.MEDIA}.mediaId as mediaId `,
  `${TABLES.MEDIA}.filepath as filepath `,
  `${TABLES.MEDIA}.filename as filename `,
  `${TABLES.MEDIA}.mimetype as mimetype `,
  `${TABLES.MEDIA}.size as size `,
  `${TABLES.MEDIA}.postId as postId `,
  `${TABLES.MEDIA}.commentId as commentId `,
  `${TABLES.MEDIA}.messageId as messageId `,
];

class MediaRepository {
  async createMedia(fields: Omit<Media, 'mediaId'>) {
    try {
      const medias = await knexdb(TABLES.MEDIA).insert(fields).returning('*');

      return medias[0];
    } catch (e) {
      logger.error('DB ERROR', e);
      throw e;
    }
  }

  async createMedias(fields: Omit<Media, 'mediaId'>[]) {
    try {
      const medias = await knexdb(TABLES.MEDIA).insert(fields).returning('*');

      return medias[0];
    } catch (e) {
      logger.error('DB ERROR', e);
      throw e;
    }
  }

  async findMedias({
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
    const medias: Media[] = await knexdb(TABLES.MEDIA)
      .select(DEFAULT_MEDIA_SELECT)
      .modify(function (queryBuilder) {
        if (sort) {
          queryBuilder.clear('order');
          queryBuilder.orderBy(parseSort(sort));
        }
        queryBuilder.limit(Number(page?.limit ?? 100));
        if (page?.offset) {
          queryBuilder.offset(+page.offset);
        }
        if (filter) {
          if (filter instanceof Array) {
            filter.forEach((el) => {
              queryBuilder.orWhere(el.columnName, el.operator, el.value);
            });
          } else {
            queryBuilder.where(filter);
          }
        }
      });

    return medias;
  }

  // async updateMessageMedias(messageId: MessageId, mediaIds: MediaId[]) {
  //   const media: Media[] = await knexdb(TABLES.MEDIA)
  //     .whereIn('mediaId', mediaIds)
  //     .update({messageId})
  //     .returning('*');

  //   return media;
  // }

  async updateEntityMedias(update: any, mediaIds: MediaId[]) {
    const media: Media[] = await knexdb(TABLES.MEDIA)
      .whereIn('mediaId', mediaIds)
      .update(update)
      .returning('*');

    return media;
  }
}

export default MediaRepository;
