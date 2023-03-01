import { memo, useState, useMemo } from "react";

import { useTypedSelector } from "@shared/hooks";

import { postModel } from "@entities/post";
import { Media } from "@entities/media";

import { MemoComments } from "@features/comments";

import { MemoPostHeader } from "../PostHeader";
import { MemoPostFooter } from "../PostFooter";

import s from "./index.module.css";

const PostCard = ({ postId }: PostCardProps) => {
  const [commentOpen, setCommentOpen] = useState(false);

  const selectPost = useMemo(() => {
    return (state: RootState) => postModel.selectById(state, postId);
  }, [postId]);

  const post = useTypedSelector(selectPost);

  return post ? (
    <article className={s.post}>
      <MemoPostHeader userId={post.userId} createdAt={post.createdAt} />
      <main className={s.content}>
        <p>{post.text}</p>
        <div className={s.images}>
          {post.medias?.map((mediaId) => (
            <Media key={mediaId} mediaId={mediaId} alt="comment media" />
          ))}
        </div>
      </main>
      <MemoPostFooter
        setCommentOpen={setCommentOpen}
        commentsCount={post.comments?.length ?? 0}
      />
      {commentOpen && (
        <details className={s.details} open>
          <summary> </summary>
          <MemoComments postId={postId} comments={post.comments} />
        </details>
      )}
    </article>
  ) : (
    <article>post is not found</article>
  );
};

const MemoPostCard = memo(PostCard);

export { PostCard, MemoPostCard };
