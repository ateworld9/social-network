import type { PostId } from "./Post";
import type { UserId } from "./User";

export type CommentId = number;
export interface Comment {
  commentId: CommentId;
  postId: PostId | null;
  userId: UserId | null;
  text: string;
  status: "created" | "edited" | "invisible" | "deleted";
  createdAt: Date | string;
  updatedAt: Date | string;

  username: string;
  profilePic: string | null;
  media: string | null;
}
