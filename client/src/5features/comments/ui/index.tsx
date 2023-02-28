import { memo, useCallback } from "react";

import { useAppDispatch, useTypedSelector } from "../../../7shared/hooks";
import { ContentInput } from "../../../7shared/ui/ContentInput";

import { selectAuthUserId } from "../../../6entities/auth";

import { sendComment } from "../model/thunks";

import s from "./index.module.css";
import { MemoCommentContainer } from "./CommentContainer";

const Comments = ({ postId, comments }: CommentsProps) => {
  const dispatch = useAppDispatch();
  const authedUserId = useTypedSelector(selectAuthUserId) as number;

  const handler = useCallback(
    (text: string, images: Media[]) => {
      dispatch(
        sendComment({
          userId: authedUserId,
          postId,
          text,
          mediaIds: images.map((image) => +image.mediaId),
        }),
      );
    },
    [dispatch, authedUserId, postId],
  );

  return (
    <>
      <section className={s.comments}>
        {comments?.length &&
          comments.map((commentId) => (
            <MemoCommentContainer key={commentId} commentId={commentId} />
          ))}
      </section>
      <ContentInput
        label="Comment"
        placeholder="Leave a comment here..."
        handler={handler}
        className={s.contentInput}
      />
    </>
  );
};

const MemoComments = memo(Comments);

export { Comments, MemoComments };
