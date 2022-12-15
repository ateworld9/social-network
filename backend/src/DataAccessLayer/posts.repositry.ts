import knexdb from '../config/database';
import logger from '../utils/logger';
import {Post} from '../@types/post';

const POSTS_TABLE = 'posts';

type PostExt = Post & {
  username: string;
  profilePic?: string | null;
  media?: string | null;
};

class PostsRepository {
  async getAllPosts() {
    try {
      const posts = await knexdb(POSTS_TABLE);
      return posts;
    } catch (error) {
      logger.error(error, 'DB ERROR');
    }
  }

  async findPosts(fields: Partial<Post>, limit?: number, offset?: number) {
    const where = Object.fromEntries(
      Object.entries(fields).map((entry) => [`posts.${entry[0]}`, entry[1]]),
    );

    try {
      const posts: PostExt[] = await knexdb(POSTS_TABLE)
        .select(
          'posts.userId as userId',
          'users.username as username',
          'um.path as profilePic',

          'posts.postId as postId',
          'posts.text as text',
          'posts.status as status',
          'media.path as media',

          'posts.createdAt',
          'posts.updatedAt',
        )
        .join('users', 'users.userId', '=', 'posts.userId')
        .leftJoin('media as um', 'um.mediaId', '=', 'users.profilePic')
        .leftJoin('post2media as p2m', 'p2m.postId', 'posts.postId')
        .join('media', 'media.mediaId', '=', 'p2m.mediaId')
        .where(where)
        .limit(limit ?? 10)
        .offset(offset ?? 0);
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
