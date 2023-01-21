import {PostId} from './post';
import {UserId} from './user';

export type CommentId = number;

export enum CommentStatus {
  created = 'created',
  edited = 'edited',
  deleted = 'deleted',
}

export interface Comment {
  commentId: CommentId;
  postId: PostId | null;
  userId: UserId | null;
  text: string;
  status: CommentStatus;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export type CommentExt = Comment & {
  username: string;
  profilePic: string | null;
  media: string | null;
};
