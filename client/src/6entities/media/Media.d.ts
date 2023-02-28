declare interface Media {
  mediaId: number;
  filename: string;
  filepath: string;
  mimetype: string;
  size: bigint;

  postId?: number | null;
  commentId?: number | null;
  messageId?: number | null;
}

declare type MediaId = Media["mediaId"];
