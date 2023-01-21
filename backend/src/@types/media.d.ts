export type MediaId = number;

export interface Media {
  mediaId: MediaId;
  filename: string;
  filepath: string;
  mimetype: string;
  size: bigint;

  postId?: number | null;
  commentId?: number | null;
  messageId?: number | null;
}
