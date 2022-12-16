import type { FC } from "react";

import Post from "./Post";
import type { Post as IPost } from "../../models/Post";

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

// const posts = [
//   {
//     id: 1,
//     name: 'Jane Doe',
//     userId: 1,
//     profilePic: 'https://picsum.photos/200/300',
//     text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
//     img: 'https://picsum.photos/1499/1200',
//   },
//   {
//     id: 2,
//     name: 'Jane Doe',
//     userId: 1,
//     profilePic: 'https://picsum.photos/200/300',
//     text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, tenetur.',
//     img: 'https://picsum.photos/1499/1100',
//   },
//   {
//     id: 3,
//     name: 'Jane Doe',
//     userId: 1,
//     profilePic: 'https://picsum.photos/200/300',
//     text: 'Lorem ipsum dolor sit amet.',
//     img: 'https://picsum.photos/1499/1400',
//   },
//   {
//     id: 4,
//     name: 'Jane Doe',
//     userId: 1,
//     profilePic: 'https://picsum.photos/200/300',
//     text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
//     img: 'https://picsum.photos/1499/1510',
//   },
// ];
