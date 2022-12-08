import knexdb from '../config/database';
import logger from '../utils/logger';
import {Post} from '../@types/post';

const POSTS_TABLE = 'posts';

class PostsRepository {
  async getAllPosts() {
    try {
      const posts = await knexdb(POSTS_TABLE);
      return posts;
    } catch (error) {
      logger.error(error, 'DB ERROR');
    }
  }

  async createPost(fields: Omit<Post, 'createdAt' | 'updatedAt'>) {
    try {
      const result = await knexdb(POSTS_TABLE).insert(fields).returning('*');

      return result[0];
    } catch (error) {
      logger.error(error, 'DB ERROR');
    }
  }
}

export default PostsRepository;
