import knexdb from '../config/database';
import logger from '../utils/logger';

import {TABLES} from './constants';
import {parseSort} from './utils';

const DEFAULT_LIKES_SELECT = [
  `${TABLES.LIKES}.likeId as likeId `,
  `${TABLES.LIKES}.userId as userId `,
  `${TABLES.LIKES}.postId as postId `,
  `${TABLES.LIKES}.commentId as commentId `,
  `${TABLES.LIKES}.createdAt as createdAt `,
  `${TABLES.LIKES}.updatedAt as updatedAt `,
];

class LikeRepository {
  async createLike(fields: Partial<Like>) {
    try {
      const likes = await knexdb(TABLES.LIKES).insert(fields).returning('*');

      return likes[0];
    } catch (e) {
      logger.error('DB ERROR', e);
      throw e;
    }
  }

  async findLikes({
    filter,
    page,
    sort,
  }: {
    page?: Page;
    sort?: Sort;
    include?: Include;
    fields?: Fields;
    filter?: Filter<Like>;
  }) {
    const likes: Like[] = await knexdb(TABLES.LIKES)
      .select(DEFAULT_LIKES_SELECT)
      .orderBy('createdAt')
      .modify(function (queryBuilder) {
        if (sort) {
          queryBuilder.clear('order');
          queryBuilder.orderBy(parseSort(sort));
        }
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

    return likes;
  }

  async deleteLike(likeId: LikeId) {
    const res = await knexdb(TABLES.LIKES).where({likeId}).del();
    return res;
  }
}

export default LikeRepository;
