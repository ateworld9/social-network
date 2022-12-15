import {AppError} from '../utils/app-errors';

import PostsRepository from '../DataAccessLayer/posts.repositry';
import {Post} from '../@types/post';

const postsRepository = new PostsRepository();
class UserUseCases {
  async getPosts(query: Partial<Post>, limit?: number, offset?: number) {
    const posts = await postsRepository.findPosts(query, limit, offset);

    if (!posts) {
      throw AppError.NoContent('No posts');
    }
    return posts;
  }
}

export default UserUseCases;
