declare interface Post {
  postId: number;
  userId: UserId | null;
  text: string;
  status: 'created' | 'edited' | 'invisible' | 'deleted' | 'archived';
  createdAt: Date | string;
  updatedAt: Date | string;
}

declare type PostId = Post['postId'];
