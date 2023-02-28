declare interface Media {
  mediaId: MediaId;
  filename: string;
  filepath: string;
  mimetype: string;
  size: bigint;

  postId?: number | null;
  commentId?: number | null;
  messageId?: number | null;
}

declare type MediaId = Media['mediaId'];
