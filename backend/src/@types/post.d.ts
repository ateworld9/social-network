import {CommentExt} from './comment';
import {Media} from './media';

export interface Post {
  postId: number;
  userId: number | null;
  text: string;
  status: 'created' | 'edited' | 'invisible' | 'deleted';
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

export type Post2Media = Media & {
  postId: number;
};
