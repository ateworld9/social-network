import lodash from 'lodash';
import {AppError} from '../utils/app-errors';

import PostsRepository from '../DataAccessLayer/posts.repository';
import CommentsUseCases from './comments.use-cases';
import UsersUseCases from './users.use-cases';
import LikesUseCases from './likes.use-cases';
import MediaUseCases from './media.use-cases';

const postsRepository = new PostsRepository();

const mediaUseCases = new MediaUseCases();
const usersUseCases = new UsersUseCases();
const commentsUseCases = new CommentsUseCases();
class PostsUseCases {
  static async getPosts({
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
    const posts = await postsRepository.findPosts({filter, sort, page});
    if (!posts) throw AppError.NoContent('NoContent: no posts');
    const count = await postsRepository.getCount(filter);

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

    const likes = await LikesUseCases.getLikes({
      filter: [
        {
          columnName: 'postId',
          operator: 'in',
          value: Array.from(postIdsArr),
        },
      ],
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

    const postLikes = lodash.groupBy(likes, 'postId');
    const postMedias = lodash.groupBy(media, 'postId');
    const postComments = lodash.groupBy(commentsRes.comments, 'postId');
    const postsWithRefs = posts.map((post) => ({
      ...post,
      medias: postMedias[post.postId]?.map((media) => media.filename),
      comments: postComments[post.postId]?.map((comment) => comment.commentId),
      likes: postLikes[post.postId] || [],
    }));

    return {
      posts: postsWithRefs,
      relationships: {
        users: users.concat(commentsRes.relationships.users),
        comments: commentsRes.comments,
      },
      meta: {
        count: +count[0].count,
      },
    };
  }

  static async createPost(userId: UserId, text: string, mediaIds?: number[]) {
    const user = usersUseCases.findUserByQuery({filter: {userId}});
    if (!user)
      throw AppError.UnAuthorized('UnAuthorized: no user with this id');

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

    const {posts, relationships} = await this.getPosts({
      filter: {postId: post.postId},
    });
    if (!posts[0]) {
      throw AppError.InternalError('Internal Error, cannot find saved post');
    }

    return {posts, relationships};
  }

  static async deletePost(postId: PostId, userId: UserId) {
    const {posts} = await this.getPosts({
      filter: {postId: postId},
    });
    if (!posts[0]) {
      throw AppError.NotFound(`NotFound: post with id:${postId} is not exist`);
    }

    const user = await usersUseCases.findUserByQuery({filter: {userId}});
    if (!user) {
      throw AppError.UnAuthorized('UnAuthorized: no user with this id');
    }

    if (posts[0].userId !== userId) {
      if (user.role === 'admin') {
      } else {
        throw AppError.Forbidden('updateUser Forbidden');
      }
    }

    const res = await postsRepository.deletePost(postId);

    return res;
  }
}

export default PostsUseCases;
