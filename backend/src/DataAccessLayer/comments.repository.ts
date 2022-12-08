import {Comment} from 'src/@types/comment';
import logger from '..//utils/logger';
import knexdb from '../config/database';

const COMMENTS_TABLE = 'comments';

class CommentsRepository {
  async getCommentsByPostId(postId: number) {
    try {
      const comments = await knexdb(COMMENTS_TABLE).where({postId});
      return comments;
    } catch (error) {
      logger.error(error, 'DB Error');
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
    }
  }
}

export default CommentsRepository;
