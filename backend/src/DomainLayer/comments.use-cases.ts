import {AppError} from '../utils/app-errors';

import CommentsRepository from '../DataAccessLayer/comments.repository';

const commentsRepository = new CommentsRepository();
class CommentsUseCases {
  async getCommentsByPostsIds(postsIds: number[]) {
    const comments = await commentsRepository.findCommentsByPostIDs(postsIds);

    if (!comments) {
      throw AppError.NoContent('No posts');
    }

    return comments;
  }
}

export default CommentsUseCases;
