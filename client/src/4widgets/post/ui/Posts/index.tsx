import { memo, useEffect, useState, useRef } from "react";

import { useAppDispatch, useTypedSelector } from "@shared/hooks";

import { postModel } from "@entities/post";

import { PostCard } from "../PostCard";

import { fetchMorePosts, fetchPosts } from "../../model/thunks";
import s from "./index.module.css";

type PostsProps = {
  fetchOptions: any;
};

const Posts = ({ fetchOptions }: PostsProps) => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchPosts({ ...fetchOptions, limit: 10 }));
  }, [dispatch, fetchOptions]);

  const count = useTypedSelector(postModel.selectCount);
  const loading = useTypedSelector(postModel.selectLoading);
  const postIds = useTypedSelector(postModel.selectIds);

  const list = useRef(null);
  const loader = useRef(null);

  useEffect(() => {
    const handleObserver = (entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        if (page * 10 < count) {
          dispatch(
            fetchMorePosts({ ...fetchOptions, limit: 10, offset: page * 10 }),
          );
          setPage((prev) => prev + 1);
        }
      }
    };
    const option = {
      root: null,
      rootMargin: "",
      threshold: 0.75,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [dispatch, fetchOptions, page, count]);

  // if (isPostsLoading === "loading") return <div>posts loading skeleton</div>;
  return (
    <section ref={list} className={s.posts}>
      {postIds?.length &&
        postIds.map((postId) => <PostCard key={postId} postId={postId} />)}
      {loading === "lazy" && <div>... Loading</div>}
      {postIds?.length && <div ref={loader} className={s.last} />}
    </section>
  );
};

const MemoPosts = memo(Posts);

export { Posts, MemoPosts };
