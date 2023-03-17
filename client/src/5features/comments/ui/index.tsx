import { memo } from "react";

import { useAppDispatch, useTypedSelector } from "@shared/hooks";
import { ContentInput } from "@shared/ui/ContentInput";

import { selectAuthUserId } from "@entities/auth";

import { sendComment } from "../model/thunks";

import s from "./index.module.css";
import { CommentContainer } from "./CommentContainer";

const Comments = ({ postId, comments }: CommentsProps) => {
  const dispatch = useAppDispatch();
  const authedUserId = useTypedSelector(selectAuthUserId) as number;

  const handler = (text: string, images: Media[]) => {
    dispatch(
      sendComment({
        userId: authedUserId,
        postId,
        text,
        mediaIds: images.map((image) => +image.mediaId),
      }),
    );
  };

  return (
    <>
      <section className={s.comments}>
        {comments?.length &&
          comments.map((commentId) => (
            <CommentContainer key={commentId} commentId={commentId} />
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
