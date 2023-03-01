import { memo } from "react";

import { useTypedSelector } from "@shared/hooks";

import { postModel } from "@entities/post";

import { PostCard } from "../PostCard";

import s from "./index.module.css";

// type PostsProps = ;

const selectPostsLoading = (state: RootState) => state.home.isPostsLoading;

// TODO: upload more on scroll
const Posts = () => {
  const isPostsLoading = useTypedSelector(selectPostsLoading);
  const postIds = useTypedSelector(postModel.selectIds);

  if (isPostsLoading) return <div>posts loading skeleton</div>;

  return (
    <section className={s.posts}>
      {postIds?.length ? (
        postIds.map((postId) => <PostCard key={postId} postId={postId} />)
      ) : (
        <article>no posts yet</article>
      )}
    </section>
  );
};

const MemoPosts = memo(Posts);

export { Posts, MemoPosts };
