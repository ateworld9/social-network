import type { FC } from "react";

import Post from "./Post";
import type { Post as IPost } from "../../@types/Post";

// TODO: upload more on scroll

const Posts: FC<{ posts?: IPost[]; isLoading: boolean }> = ({
  posts = [],
  isLoading,
}) => {
  return (
    <div
      style={{
        padding: "1cqw 3cqw",
        display: "flex",
        flexDirection: "column",
        gap: "2cqw",
      }}
    >
      {isLoading && <div>posts loading skeleton</div>}
      {posts?.length
        ? posts.map((post) => <Post {...post} key={post.postId} />)
        : "no posts yet"}
    </div>
  );
};

export default Posts;
