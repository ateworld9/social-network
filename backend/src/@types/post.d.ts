import {CommentExt} from './comment';

export interface Post {
  postId: number;
  userId: number | null;
  text: string;
  status: 'created' | 'edited' | 'invisible' | 'deleted';
  createdAt: Date | string;
  updatedAt: Date | string;
}
type PostExt = Post & {
  username: string;
  profilePic?: string | null;
  media?: string | null;
  comments?: CommentExt[];
};
