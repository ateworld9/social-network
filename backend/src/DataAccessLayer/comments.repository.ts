import {Comment, CommentExt} from 'src/@types/comment';
import logger from '..//utils/logger';
import knexdb from '../config/database';

const COMMENTS_TABLE = 'comments';

class CommentsRepository {
  async findCommentsByPostId(postId: number) {
    try {
      const comments: CommentExt[] = await knexdb(COMMENTS_TABLE)
        .select(
          `${COMMENTS_TABLE}.userId as userId`,
          `users.username as username`,
          `um.path as profilePic`,

          `${COMMENTS_TABLE}.postId as postId`,
          `${COMMENTS_TABLE}.commentId as commentId`,
          `${COMMENTS_TABLE}.text as text`,
          `${COMMENTS_TABLE}.status as status`,
          `media.path as media`, // TODO: update when multiple medias

          `${COMMENTS_TABLE}.createdAt as createdAt`,
          `${COMMENTS_TABLE}.updatedAt as updatedAt`,
        )
        .join('users', 'users.userId', '=', `${COMMENTS_TABLE}.userId`)
        .leftJoin('media as um', 'um.mediaId', '=', 'users.profilePic')
        .leftJoin('comment2media as c2m', 'c2m.commentId', 'comments.commentId')
        .join('media', 'media.mediaId', '=', 'p2m.mediaId')
        .where({postId});

      return comments;
    } catch (error) {
      logger.error(error, 'DB Error');
      throw error;
    }
  }

  async findCommentsByPostIDs(postsIds: number[]) {
    try {
      const comments: CommentExt[] = await knexdb(COMMENTS_TABLE)
        .select(
          `${COMMENTS_TABLE}.userId as userId`,
          `users.username as username`,
          `um.path as profilePic`,

          `${COMMENTS_TABLE}.commentId as commentId`,
          `${COMMENTS_TABLE}.postId as postId`,
          `${COMMENTS_TABLE}.text as text`,
          `${COMMENTS_TABLE}.status as status`,
          `media.path as media`, // TODO: update when multiple medias

          `${COMMENTS_TABLE}.createdAt`,
          `${COMMENTS_TABLE}.updatedAt`,
        )
        .join('users', 'users.userId', '=', `${COMMENTS_TABLE}.userId`)
        .leftJoin('media as um', 'um.mediaId', '=', 'users.profilePic')
        .leftJoin('comment2media as c2m', 'c2m.commentId', 'comments.commentId')
        .leftJoin('media', 'media.mediaId', '=', 'c2m.mediaId')
        .whereIn('postId', postsIds);
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
        .update({...fieldstoUpdate, status: 'edited', updatedAt: new Date()})
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
