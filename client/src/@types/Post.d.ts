import { Comment } from "./Comment";
import { Media } from "./Media";
import { UserId } from "./User";

export type PostId = number;
export interface Post {
  postId: PostId;
  text: string;
  media?: Media[];
  status: "created" | "edited" | "invisible" | "deleted";

  comments: Comment[];

  userId: UserId | null;
  username: string;
  profilePic?: string;

  createdAt: Date | string;
  updatedAt: Date | string;
}
