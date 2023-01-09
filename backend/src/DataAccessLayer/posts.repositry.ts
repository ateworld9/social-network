import knexdb from '../config/database';
import logger from '../utils/logger';
import {Post, PostTempExt, Post2Media} from '../@types/post';
import {Media} from '../@types/media';

const POSTS_TABLE = 'posts';

class PostsRepository {
  async findPosts(fields: Partial<Post>, limit?: number, offset?: number) {
    const where = Object.fromEntries(
      Object.entries(fields).map((entry) => [`posts.${entry[0]}`, entry[1]]),
    );

    try {
      const posts: PostTempExt[] = await knexdb(POSTS_TABLE)
        .select(
          'posts.userId as userId',
          'users.username as username',
          'um.filepath as profilePic',

          'posts.postId as postId',
          'posts.text as text',
          'posts.status as status',

          'posts.createdAt',
          'posts.updatedAt',
        )
        .join('users', 'users.userId', '=', 'posts.userId')
        .leftJoin('media as um', 'um.mediaId', '=', 'users.profilePic')
        .where(where)
        .limit(limit ?? 10)
        .offset(offset ?? 0)
        .orderBy('postId', 'desc');

      const postsMedia: Post2Media[] = await knexdb('post2media')
        .select(
          'post2media.postId as postId',
          'media.mediaId as mediaId',
          'media.filepath as filepath',
          'media.filename as filename',
          'media.mimetype as mimetype',
          'media.size as size',
        )
        .join('media', 'media.mediaId', '=', 'post2media.mediaId')
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

  async createPost(userId: number, text: string, mediaIds?: number[]) {
    try {
      const posts: Post[] = await knexdb(POSTS_TABLE)
        .insert({userId, text})
        .returning('*');

      // if (mediaIds?.length) {
      //   const newRows = mediaIds.map((mediaId) => ({
      //     postId: posts[0].postId,
      //     mediaId,
      //   }));
      //   const post2medias = await knexdb('post2media').insert(newRows);
      //   return {
      //     ...posts[0],
      //     media: post2medias,
      //   };
      // }

      return posts[0];
    } catch (error) {
      logger.error(error, 'DB ERROR');
      throw error;
    }
  }
  async createPost2Medias(postId: number, mediaIds: number[]) {
    try {
      const newRows = mediaIds.map((mediaId) => ({
        postId,
        mediaId,
      }));
      const post2medias = await knexdb('post2media').insert(newRows);
      return post2medias;
    } catch (error) {
      logger.error(error, 'DB ERROR');
      throw error;
    }
  }
}

export default PostsRepository;
