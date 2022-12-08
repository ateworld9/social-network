export interface Post {
  postId: number;
  userId: number | null;
  text: string;
  status: 'created' | 'edited' | 'invisible' | 'deleted';
  createdAt: Date | string;
  updatedAt: Date | string;
}
