import lodash from 'lodash';
import {AppError} from '../utils/app-errors';

import CommentsRepository from '../DataAccessLayer/comments.repository';

import MediaUseCases from './media.use-cases';
import PostsUseCases from './posts.use-cases';
import UsersUseCases from './users.use-cases';

const commentsRepository = new CommentsRepository();

const mediaUseCases = new MediaUseCases();
const usersUseCases = new UsersUseCases();

class CommentsUseCases {
  async createComment(
    postId: PostId,
    userId: UserId,
    text: string,
    mediaIds?: number[],
  ) {
    const {posts} = await PostsUseCases.getPostsByQuery({filter: {postId}});
    if (!posts[0]) AppError.BadRequest('BadRequest: no post with this id');

    const user = await usersUseCases.findUserByQuery({filter: {userId}});
    if (!user) AppError.UnAuthorized('UnAuthorized: no user with this id');

    const comment = await commentsRepository.createComment({
      postId,
      userId,
      text,
      status: 'created',
    });
    if (!comment) {
      throw AppError.InternalError('can`t save post to database');
    }

    if (mediaIds?.length) {
      const media = await mediaUseCases.updateEntityMedias(
        {commentId: comment.commentId},
        mediaIds,
      );
      if (!media) {
        throw AppError.InternalError(
          'can`t save comment and medias relationships to database',
        );
      }
    }

    const {comments, relationships} = await this.getCommentsByQuery({
      filter: {commentId: comment.commentId},
    });
    if (!comments[0]) {
      throw AppError.InternalError('Internal Error, cannot find saved comment');
    }

    return {comments, relationships};
  }

  async getCommentsByQuery({
    filter,
    sort,
    page,
  }: {
    include?: Include;
    fields?: Fields;
    sort?: Sort;
    page?: Page;
    filter?: Filter<Comment>;
  }) {
    const comments = await commentsRepository.findComments({
      page,
      sort,
      filter,
    });

    const commentIds = new Set<number>();
    const userIds = new Set<number>();
    comments.forEach(({commentId, userId}) => {
      commentId !== null && commentIds.add(commentId);
      userId !== null && userIds.add(userId);
    });

    const {users} = await usersUseCases.findUsersByQuery({
      filter: [
        {
          columnName: 'userId',
          operator: 'in',
          value: Array.from(userIds),
        },
      ],
    });

    const media = await mediaUseCases.getImages({
      filter: [
        {
          columnName: 'commentId',
          operator: 'in',
          value: Array.from(commentIds),
        },
      ],
    });
    const commentMedias = lodash.groupBy(media, 'commentId');

    const commentsWithMedia = comments.map((comment) => ({
      ...comment,
      medias: commentMedias[comment.commentId]?.map((media) => media.mediaId),
    }));
    return {comments: commentsWithMedia, relationships: {media, users}};
  }
}

export default CommentsUseCases;
