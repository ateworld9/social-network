declare interface Media {
  mediaId: MediaId;
  filename: string;
  filepath: string;
  mimetype: string;
  size: bigint;

  avatar?: UserId | null;
  cover?: UserId | null;

  postId?: PostId | null;
  commentId?: CommentId | null;
  messageId?: MessageId | null;
}

declare type MediaId = Media['mediaId'];
