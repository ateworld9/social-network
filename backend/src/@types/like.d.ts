declare interface Like {
  likeId: LikeId;
  userId: UserId;
  postId?: PostId | null;
  commentId?: CommentId | null;
}

declare type LikeId = Like['likeId'];
