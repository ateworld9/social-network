import { memo } from "react";
import { Comment, commentModel } from "@entities/comment";

import { UserAvatarLink, userModel, UsernameLink } from "@entities/user";

import { useTypedSelector } from "@shared/hooks";

import s from "./index.module.css";

const CommentContainer = ({ commentId }: CommentContainerProps) => {
  const comment = useTypedSelector((state) =>
    commentModel.selectById(state, commentId),
  ) as CommentT;

  const user = useTypedSelector((state) =>
    userModel.selectById(state, comment.userId),
  ) as User;

  return comment ? (
    <article className={s.user}>
      <UserAvatarLink userId={user.userId} filename={user.avatar} />
      <div className={s.comment}>
        <UsernameLink
          userId={user.userId}
          name={user.name}
          surname={user.surname}
          tag
          username={user.username}
        />
        <Comment text={comment.text} createdAt={comment.createdAt} />
      </div>
    </article>
  ) : (
    <article>comment is not loaded, error</article>
  );
};

const MemoCommentContainer = memo(CommentContainer);

export { CommentContainer, MemoCommentContainer };
