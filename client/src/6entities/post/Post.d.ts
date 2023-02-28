declare type Post = {
  postId: number | string;
  userId: UserId | null;
  text: string;
  status: "created" | "edited" | "invisible" | "deleted";

  comments?: CommentId[];
  medias?: MediaId[];

  username: string;
  profilePic?: string;

  createdAt: string;
  updatedAt: string;
};

declare type PostId = Post["postId"];
