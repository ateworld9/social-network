import knexdb from '../../config/database';
import {TABLES} from '../../constants';

import {parseSort} from '../../utils';
import logger from '../../logger';

const DEFAULT_COMMENT_SELECT = [
  `${TABLES.COMMENTS}.commentId as commentId`,
  `${TABLES.COMMENTS}.postId as postId`,
  `${TABLES.COMMENTS}.userId as userId`,
  `${TABLES.COMMENTS}.text as text`,
  `${TABLES.COMMENTS}.status as status`,
  `${TABLES.COMMENTS}.createdAt as createdAt`,
  `${TABLES.COMMENTS}.updatedAt as updatedAt`,
];

class CommentsRepository {
  async findComments({
    sort,
    page,
    filter,
  }: {
    include?: Include;
    fields?: Fields;
    sort?: Sort;
    page?: Page;
    filter?: Filter<Comment>;
  }) {
    const comments: Comment[] = await knexdb(TABLES.COMMENTS)
      .select(DEFAULT_COMMENT_SELECT)
      .orderBy('createdAt', 'asc', 'last')
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
    return comments;
  }

  async createComment(
    fields: Omit<Comment, 'commentId' | 'createdAt' | 'updatedAt'>,
  ) {
    try {
      const result = await knexdb(TABLES.COMMENTS)
        .insert(fields)
        .returning('*');

      return result[0];
    } catch (error) {
      logger.error(error, 'DB Error');
      throw error;
    }
  }
}

export default CommentsRepository;
