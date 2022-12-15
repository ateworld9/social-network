import {AppError} from '../utils/app-errors';

import {Post} from '../@types/post';

import PostsRepository from '../DataAccessLayer/posts.repositry';
import CommentsUseCases from './comments.use-cases';

const postsRepository = new PostsRepository();

const commentsUseCases = new CommentsUseCases();
class UserUseCases {
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
}

export default UserUseCases;
