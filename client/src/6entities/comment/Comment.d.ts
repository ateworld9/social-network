declare type CommentT = {
  commentId: number;
  postId: PostId;
  userId: UserId;
  text: string;
  status: "created" | "edited" | "invisible" | "deleted";
  createdAt: Date | string;
  updatedAt: Date | string;

  username: string;
  avatar: string | null;
  media: string | null;
};

declare type CommentId = CommentT["commentId"];
