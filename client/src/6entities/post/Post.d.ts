declare type Post = {
  postId: number | string;
  userId: UserId;
  text: string;
  status: "created" | "edited" | "invisible" | "deleted";

  comments?: CommentId[];
  medias?: Media["filename"][];
  likes: Like[];
  liked: boolean;

  username: string;
  avatar?: string;

  createdAt: string;
  updatedAt: string;
};

declare type PostId = Post["postId"];
