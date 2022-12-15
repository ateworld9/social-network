import {Comment, CommentExt} from 'src/@types/comment';
import logger from '..//utils/logger';
import knexdb from '../config/database';

const COMMENTS_TABLE = 'comments';

class CommentsRepository {
  async findCommentsByPostId(postId: number) {
    try {
      const comments: CommentExt[] = await knexdb(COMMENTS_TABLE)
        .select(
          `${COMMENTS_TABLE}.userId as userId`,
          `users.username as username`,
          `um.path as profilePic`,

          `${COMMENTS_TABLE}.postId as postId`,
          `${COMMENTS_TABLE}.commentId as commentId`,
          `${COMMENTS_TABLE}.text as text`,
          `${COMMENTS_TABLE}.status as status`,
          `media.path as media`, // TODO: update when multiple medias

          `${COMMENTS_TABLE}.createdAt as createdAt`,
          `${COMMENTS_TABLE}.updatedAt as updatedAt`,
        )
        .join('users', 'users.userId', '=', `${COMMENTS_TABLE}.userId`)
        .leftJoin('media as um', 'um.mediaId', '=', 'users.profilePic')
        .leftJoin('comment2media as c2m', 'c2m.commentId', 'comments.commentId')
        .join('media', 'media.mediaId', '=', 'p2m.mediaId')
        .where({postId});

      console.log(comments);

      return comments;
    } catch (error) {
      logger.error(error, 'DB Error');
    }
  }

  async findCommentsByPostIDs(postsIds: number[]) {
    try {
      const comments: CommentExt[] = await knexdb(COMMENTS_TABLE)
        .select(
          `${COMMENTS_TABLE}.userId as userId`,
          `users.username as username`,
          `um.path as profilePic`,

          `${COMMENTS_TABLE}.commentId as commentId`,
          `${COMMENTS_TABLE}.postId as postId`,
          `${COMMENTS_TABLE}.text as text`,
          `${COMMENTS_TABLE}.status as status`,
          `media.path as media`, // TODO: update when multiple medias

          `${COMMENTS_TABLE}.createdAt`,
          `${COMMENTS_TABLE}.updatedAt`,
        )
        .join('users', 'users.userId', '=', `${COMMENTS_TABLE}.userId`)
        .leftJoin('media as um', 'um.mediaId', '=', 'users.profilePic')
        .leftJoin('comment2media as c2m', 'c2m.commentId', 'comments.commentId')
        .leftJoin('media', 'media.mediaId', '=', 'c2m.mediaId')
        .whereIn('postId', postsIds);
      return comments;
    } catch (error) {
      logger.error(error, 'DB Error');
    }
  }

  async createComment(
    fields: Omit<Comment, 'createdAt' | 'updatedAt' | 'status'>,
  ) {
    try {
      const result = await knexdb(COMMENTS_TABLE).insert(fields).returning('*');

      return result[0];
    } catch (error) {
      logger.error(error, 'DB Error');
    }
  }

  async updateComment(commentId: number, fieldstoUpdate: Partial<Comment>) {
    try {
      const result = await knexdb(COMMENTS_TABLE)
        .update({...fieldstoUpdate, status: 'edited', updatedAt: new Date()})
        .where({commentId})
        .returning('*');

      return result;
    } catch (error) {
      logger.error(error, 'DB Error');
    }
  }
}

export default CommentsRepository;

// select
//  "comments"."userId" as "userId",
//  "users"."username" as "username",
//  "um"."path" as "profilePic",
//  "comments"."postId" as "postId",
//  "comments"."text" as "text",
//  "comments"."status" as "status",
//  "media"."path" as "media",
//  "comments"."createdAt",
//  "comments"."updatedAt"
//  from "comments"
// inner join "users" on "users"."userId" = "comments"."userId"
// left join "media" as "um" on "um"."mediaId" = "users"."profilePic"
// left join "comment2media" as "c2m" on "c2m"."commentId" = "media"."mediaId"
// inner join "media" on "media"."mediaId" = "c2m"."mediaId"
// where "postId" in ($1, $2, $3) - invalid reference to FROM-clause entry for table "media"
