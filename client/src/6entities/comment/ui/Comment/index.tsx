import dayjs from "dayjs";
import { memo } from "react";

import s from "./index.module.css";

type CommentProps = { text: string; createdAt: string | Date };

const Comment = ({ text, createdAt }: CommentProps) => {
  return (
    <div className={s.comment}>
      <span className={s.text}>{text}</span>
      <span className={s.date}>{dayjs(createdAt).fromNow()}</span>
    </div>
  );
};

const MemoComment = memo(Comment);

export { Comment, MemoComment };
