import { Comment } from "./Comment";
import { Media } from "./Media";

export interface Post {
  postId: number;
  text: string;
  media?: Media[];
  status: "created" | "edited" | "invisible" | "deleted";

  comments: Comment[];

  userId: number | null;
  username: string;
  profilePic?: string;

  createdAt: Date | string;
  updatedAt: Date | string;
}
