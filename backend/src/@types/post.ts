import {CommentExt} from './comment';
import {UserId} from './user';

export type PostId = number;

export enum PostStatus {
  created = 'created',
  edited = 'edited',
  invisible = 'invisible',
  deleted = 'deleted',
  archived = 'archived',
}
export interface Post {
  postId: PostId;
  userId: UserId | null;
  text: string;
  status: PostStatus;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export type PostTempExt = Post & {
  username: string;
  profilePic?: string | null;
  comments?: CommentExt[];
};

export type PostExt = Post & {
  username: string;
  profilePic?: string | null;
  media?: Array<{
    mediaPath?: string;
    mediaName?: string;
  }>;
  comments?: CommentExt[];
};
