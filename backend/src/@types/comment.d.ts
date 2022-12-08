export interface Comment {
  commentId: number;
  postId: number | null;
  userId: number | null;
  text: string;
  status: 'created' | 'edited' | 'invisible' | 'deleted';
  createdAt: Date | string;
  updatedAt: Date | string;
}
