import {Comment, CommentExt, CommentStatus} from '../@types/comment';
import logger from '../utils/logger';
import knexdb from '../config/database';

import {COMMENTS_TABLE} from './constants';

class CommentsRepository {
  async findCommentsByPostId(postId: number) {
    try {
      const comments: CommentExt[] = await knexdb(COMMENTS_TABLE)
        .select(
          `${COMMENTS_TABLE}.userId as userId`,
          `users.username as username`,
          `um.filepath as profilePic`,

          `${COMMENTS_TABLE}.postId as postId`,
          `${COMMENTS_TABLE}.commentId as commentId`,
          `${COMMENTS_TABLE}.text as text`,
          `${COMMENTS_TABLE}.status as status`,
          `media.filepath as media`, // TODO: update when multiple medias

          `${COMMENTS_TABLE}.createdAt as createdAt`,
          `${COMMENTS_TABLE}.updatedAt as updatedAt`,
        )
        .join('users', 'users.userId', '=', `${COMMENTS_TABLE}.userId`)
        .leftJoin('media as um', 'um.mediaId', '=', 'users.profilePic')
        .leftJoin(
          'media',
          'media.commentId',
          '=',
          `${COMMENTS_TABLE}.commentId`,
        )
        .where(`${COMMENTS_TABLE}.postId`, postId);

      return comments;
    } catch (error) {
      logger.error(error, 'DB Error');
      throw error;
    }
  }

  async findCommentsByPostIds(postsIds: number[]) {
    try {
      const comments: CommentExt[] = await knexdb(COMMENTS_TABLE)
        .select(
          `${COMMENTS_TABLE}.userId as userId`,
          `users.username as username`,
          `um.filepath as profilePic`,

          `${COMMENTS_TABLE}.commentId as commentId`,
          `${COMMENTS_TABLE}.postId as postId`,
          `${COMMENTS_TABLE}.text as text`,
          `${COMMENTS_TABLE}.status as status`,
          `media.filepath as media`, // TODO: update when multiple medias

          `${COMMENTS_TABLE}.createdAt`,
          `${COMMENTS_TABLE}.updatedAt`,
        )
        .join('users', 'users.userId', '=', `${COMMENTS_TABLE}.userId`)
        .leftJoin('media as um', 'um.mediaId', '=', 'users.profilePic')
        .leftJoin(
          'media',
          'media.commentId',
          '=',
          `${COMMENTS_TABLE}.commentId`,
        )
        .whereIn(`${COMMENTS_TABLE}.postId`, postsIds);
      return comments;
    } catch (error) {
      logger.error(error, 'DB Error');
      throw error;
    }
  }

  async createComment(
    fields: Omit<Comment, 'createdAt' | 'updatedAt' | 'status'>,
  ) {
    try {
      const result = await knexdb(COMMENTS_TABLE).insert(fields).returning('*');

      return result[0];
    } catch (error) {
      logger.error(error, 'DB Error');
      throw error;
    }
  }

  async updateComment(commentId: number, fieldstoUpdate: Partial<Comment>) {
    try {
      const result = await knexdb(COMMENTS_TABLE)
        .update({
          ...fieldstoUpdate,
          status: CommentStatus.edited,
          updatedAt: new Date(),
        })
        .where({commentId})
        .returning('*');

      return result;
    } catch (error) {
      logger.error(error, 'DB Error');
      throw error;
    }
  }
}

export default CommentsRepository;
