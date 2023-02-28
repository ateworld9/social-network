declare interface Comment {
  commentId: number;
  postId: PostId | null;
  userId: UserId | null;
  text: string;
  status: 'created' | 'edited' | 'deleted';
  createdAt: Date | string;
  updatedAt: Date | string;
}
declare type CommentId = Comment['commentId'];

declare type CommentExt = Comment & {
  username: string;
  profilePic: string | null; //make it MediaId
  media: string | null; //make it MediaId[]
};
