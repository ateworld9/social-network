import lodash from 'lodash';
import {AppError} from '../utils/app-errors';

import PostsRepository from '../DataAccessLayer/posts.repositry';
import CommentsUseCases from './comments.use-cases';
import UsersUseCases from './users.use-cases';
import MediaUseCases from './media.use-cases';

const postsRepository = new PostsRepository();

const commentsUseCases = new CommentsUseCases();
const usersUseCases = new UsersUseCases();
const mediaUseCases = new MediaUseCases();
class PostsUseCases {
  static async getPostsByQuery({
    filter,
    sort,
    page,
  }: {
    include?: Include;
    fields?: Fields;
    sort?: Sort;
    page?: Page;
    filter?: Filter<Post>;
  }) {
    const posts = await postsRepository.findPostsByQuery({filter, sort, page});
    if (!posts) AppError.NoContent('NoContent: no posts');
    const postIds = new Set<number>();
    const userIds = new Set<number>();
    const commentIds = new Set<number>();
    posts.forEach(({userId, postId}) => {
      userId !== null && userIds.add(userId);
      postId !== null && postIds.add(postId);
    });
    const postIdsArr = Array.from(postIds);
    const commentsRes = await commentsUseCases.getCommentsByQuery({
      filter: [{columnName: 'postId', operator: 'in', value: postIdsArr}],
    });

    commentsRes.comments.forEach(({userId, commentId}) => {
      userId !== null && userIds.add(userId);
      commentId !== null && commentIds.add(commentId);
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
          columnName: 'postId',
          operator: 'in',
          value: postIdsArr,
        },
        {
          columnName: 'commentId',
          operator: 'in',
          value: Array.from(commentIds),
        },
      ],
    });
    const postMedias = lodash.groupBy(media, 'postId');
    const postComments = lodash.groupBy(commentsRes.comments, 'postId');
    const postsWithRefs = posts.map((post) => ({
      ...post,
      medias: postMedias[post.postId]?.map((media) => media.mediaId),
      comments: postComments[post.postId]?.map((comment) => comment.commentId),
    }));

    return {
      posts: postsWithRefs,
      relationships: {
        users: users.concat(commentsRes.relationships.users),
        media: media.concat(commentsRes.relationships.media),
        comments: commentsRes.comments,
      },
    };
  }

  static async createPost(userId: UserId, text: string, mediaIds?: number[]) {
    const user = usersUseCases.findUserByQuery({filter: {userId}});
    if (!user) AppError.UnAuthorized('UnAuthorized: no user with this id');

    const post = await postsRepository.createPost(userId, text);
    if (!post) {
      throw AppError.InternalError('can`t save post to database');
    }

    if (mediaIds?.length) {
      const media = await mediaUseCases.updateEntityMedias(
        {postId: post.postId},
        mediaIds,
      );
      if (!media) {
        throw AppError.InternalError(
          'can`t save post and medias relationships to database',
        );
      }
    }

    const {posts, relationships} = await this.getPostsByQuery({
      filter: {postId: post.postId},
    });
    if (!posts[0]) {
      throw AppError.InternalError('Internal Error, cannot find saved post');
    }

    return {posts, relationships};
  }
}

export default PostsUseCases;
