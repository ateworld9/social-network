import { memo, useState } from "react";

import { Comments } from "@features/comments";

import s from "./index.module.css";
import { ActionBar } from "./ActionBar";

const PostFooter = ({
  postId,
  likesCount,
  liked,
  comments,
}: PostFooterProps) => {
  const [commentOpen, setCommentOpen] = useState(false);

  return (
    <footer className={s.footer}>
      <ActionBar
        postId={postId}
        likesCount={likesCount}
        liked={liked}
        commentsCount={comments?.length ?? 0}
        setCommentOpen={setCommentOpen}
      />
      {commentOpen && (
        <details className={s.details} open>
          <summary> </summary>
          <Comments postId={postId} comments={comments} />
        </details>
      )}
    </footer>
  );
};

const MemoPostFooter = memo(PostFooter);
export { PostFooter, MemoPostFooter };
