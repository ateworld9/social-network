import classNames from "classnames";
import { memo, useMemo } from "react";

import { useTypedSelector } from "@shared/hooks";

import { postModel } from "@entities/post";
import { Media } from "@entities/media";

import { PostHeader } from "../PostHeader";
import { PostFooter } from "../PostFooter";

import s from "./index.module.css";

const PostCard = ({ postId }: PostCardProps) => {
  const selectPost = useMemo(() => {
    return (state: RootState) => postModel.selectById(state, postId);
  }, [postId]);

  const post = useTypedSelector(selectPost);

  return post ? (
    <article className={s.post}>
      <PostHeader
        postId={postId}
        userId={post.userId}
        createdAt={post.createdAt}
      />
      <main className={s.content}>
        {post.text && <p>{post.text}</p>}
        {post.medias && (
          <div className={classNames(s.media, "mediaContainer")}>
            {post.medias.map((filename) => (
              <Media key={filename} filename={filename} alt="comment media" />
            ))}
          </div>
        )}
      </main>
      <PostFooter
        postId={postId}
        likesCount={post.likes.length ?? 0}
        liked={post.liked}
        comments={post.comments}
      />
    </article>
  ) : (
    <article>post is not found</article>
  );
};

const MemoPostCard = memo(PostCard);

export { PostCard, MemoPostCard };
