export interface Post {
  postId: number;
  text: string;
  media?: string;
  status: "created" | "edited" | "invisible" | "deleted";

  userId: number | null;
  username: string;
  profilePic?: string;

  createdAt: Date | string;
  updatedAt: Date | string;
}
