import {AppError} from '../utils/app-errors';

import {Post} from '../@types/post';

import PostsRepository from '../DataAccessLayer/posts.repositry';
import CommentsUseCases from './comments.use-cases';
import UsersUseCases from './users.use-cases';

const postsRepository = new PostsRepository();

const commentsUseCases = new CommentsUseCases();
const usersUseCases = new UsersUseCases();
class PostsUseCases {
  async getPosts(query: Partial<Post>, limit?: number, offset?: number) {
    const posts = await postsRepository.findPosts(query, limit, offset);

    if (!posts) {
      throw AppError.NoContent('No posts');
    }

    const postsIds = posts.map((post) => post.postId);
    const comments = await commentsUseCases.getCommentsByPostsIds(postsIds);

    posts.forEach((post) => {
      post.comments = comments.filter(
        (comment) => comment.postId === post.postId,
      );
    });

    return posts;
  }

  async createPost(userId: number, text: string, mediaIds?: number[]) {
    const user = usersUseCases.getUserById(userId);
    if (!user) AppError.UnAuthorized('UnAuthorized: no user with this id');

    const post = await postsRepository.createPost(userId, text, mediaIds);
    if (!post) {
      throw AppError.InternalError('can`t save post to database');
    }

    if (mediaIds?.length) {
      const post2medias = await postsRepository.createPost2Medias(
        post.postId,
        mediaIds,
      );

      if (!post2medias) {
        throw AppError.InternalError(
          'can`t save post and medias relationships to database',
        );
      }
    }

    const savedPosts = await this.getPosts({postId: post.postId}, 1);
    if (!savedPosts) {
      throw AppError.InternalError('Internal Error, cannot find saved post');
    }

    return savedPosts[0];
  }
}

export default PostsUseCases;
