import { memo } from "react";
import { Comment, commentModel } from "@entities/comment";

import { User } from "@entities/user";

import { useTypedSelector } from "@shared/hooks";

import s from "./index.module.css";

const CommentContainer = ({ commentId }: CommentContainerProps) => {
  const comment = useTypedSelector((state) =>
    commentModel.selectById(state, commentId),
  );
  return comment ? (
    <article className={s.commentContainer}>
      <User userId={comment.userId} link>
        <Comment text={comment.text} createdAt={comment.createdAt} />
      </User>
    </article>
  ) : (
    <article>comment is not loaded, error</article>
  );
};

const MemoCommentContainer = memo(CommentContainer);

export { CommentContainer, MemoCommentContainer };
