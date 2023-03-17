import { memo, useEffect } from "react";

import { useAppDispatch, useTypedSelector } from "@shared/hooks";

import { postModel } from "@entities/post";

import { PostCard } from "../PostCard";

import { fetchPosts } from "../../model/thunks";
import s from "./index.module.css";

type PostsProps = {
  fetchOptions: any;
};

const Posts = ({ fetchOptions }: PostsProps) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPosts(fetchOptions));
  }, [dispatch, fetchOptions]);

  const isPostsLoading = useTypedSelector(postModel.selectPostsLoading);
  const postIds = useTypedSelector(postModel.selectIds);

  if (isPostsLoading === "loading") return <div>posts loading skeleton</div>;

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
