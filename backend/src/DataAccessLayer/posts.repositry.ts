import knexdb from '../config/database';
import logger from '../utils/logger';

import {UserId} from '../@types/user';
import {Post, PostTempExt} from '../@types/post';
import {Media} from '../@types/media';

import {MEDIA_TABLE, POSTS_TABLE} from './constants';

class PostsRepository {
  async findPosts(fields: Partial<Post>, limit?: number, offset?: number) {
    const where = Object.fromEntries(
      Object.entries(fields).map((entry) => [`posts.${entry[0]}`, entry[1]]),
    );

    try {
      const posts: PostTempExt[] = await knexdb(POSTS_TABLE)
        .select(
          `${POSTS_TABLE}.userId as userId`,
          'users.username as username',
          'um.filepath as profilePic',

          `${POSTS_TABLE}.postId as postId`,
          `${POSTS_TABLE}.text as text`,
          `${POSTS_TABLE}.status as status`,

          `${POSTS_TABLE}.createdAt`,
          `${POSTS_TABLE}.updatedAt`,
        )
        .join('users', 'users.userId', '=', 'posts.userId')
        .leftJoin(`${MEDIA_TABLE} as um`, 'um.mediaId', '=', 'users.profilePic')
        .where(where)
        .limit(limit ?? 10)
        .offset(offset ?? 0)
        .orderBy('postId', 'desc');

      const postsMedia: Media[] = await knexdb(MEDIA_TABLE)
        .select(
          `${MEDIA_TABLE}.mediaId as mediaId`,
          `${MEDIA_TABLE}.filepath as filepath`,
          `${MEDIA_TABLE}.filename as filename`,
          `${MEDIA_TABLE}.mimetype as mimetype`,
          `${MEDIA_TABLE}.size as size`,
          `${MEDIA_TABLE}.postId as postId`,
          `${MEDIA_TABLE}.commentId as commentId`,
          `${MEDIA_TABLE}.messageId as messageId`,
        )
        .whereIn(
          'postId',
          posts.map((post) => post.postId),
        );

      const postsExtended = posts.map((post) => ({
        ...post,
        media: postsMedia.reduce((acc: Media[], {postId, ...rest}) => {
          return postId === post.postId ? [...acc, rest] : acc;
        }, []),
      }));

      return postsExtended;
    } catch (error) {
      logger.error(error, 'DB ERROR');
      throw error;
    }
  }

  async createPost(userId: UserId, text: string, mediaIds?: number[]) {
    try {
      const posts: Post[] = await knexdb(POSTS_TABLE)
        .insert({userId, text})
        .returning('*');

      return posts[0];
    } catch (error) {
      logger.error(error, 'DB ERROR');
      throw error;
    }
  }
  async updatePostMedias(postId: number, mediaIds: number[]) {
    try {
      const media = await knexdb(MEDIA_TABLE)
        .whereIn('mediaId', mediaIds)
        .update({postId});
      return media;
    } catch (error) {
      logger.error(error, 'DB ERROR');
      throw error;
    }
  }
}

export default PostsRepository;
