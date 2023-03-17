import knexdb from '../config/database';

import {TABLES} from './constants';
import {parseSort} from './utils';

const DEFAULT_POST_SELECT = [
  `${TABLES.POSTS}.userId as userId`,
  `${TABLES.POSTS}.postId as postId`,
  `${TABLES.POSTS}.text as text`,
  `${TABLES.POSTS}.status as status`,
  `${TABLES.POSTS}.createdAt`,
  `${TABLES.POSTS}.updatedAt`,
];
class PostsRepository {
  async createPost(userId: UserId, text: string) {
    const posts: Post[] = await knexdb(TABLES.POSTS)
      .insert({userId, text})
      .returning('*');

    return posts[0];
  }
  async findPosts({
    filter,
    page,
    sort,
  }: {
    include?: Include;
    fields?: Fields;
    sort?: Sort;
    page?: Page;
    filter?: Filter<Post>;
  }) {
    const posts: Post[] = await knexdb(TABLES.POSTS)
      .select(DEFAULT_POST_SELECT)
      .whereNotNull(`${TABLES.POSTS}.userId`)
      .whereNot(`${TABLES.POSTS}.status`, 'deleted')
      .orderBy('createdAt', 'desc', 'last')
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

    return posts;
  }

  // async updatePost(postId: UserId, fields: Partial<Post>) {
  //   const result = await knexdb(TABLES.POSTS)
  //     .where({postId})
  //     .update({...fields, updatedAt: new Date()})
  //     .returning('*');
  //   return result;
  // }

  async deletePost(postId: PostId) {
    return await knexdb(TABLES.POSTS)
      .update({status: 'deleted', updatedAt: new Date()})
      .where({postId});
  }
}

export default PostsRepository;
