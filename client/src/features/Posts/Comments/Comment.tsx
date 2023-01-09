import { FC } from "react";
import type { Comment as IComment } from "../../../@types/Comment";

import { timeStringBetweenDates } from "../../util";

import s from "./comment.module.css";

const Comment: FC<IComment> = ({ profilePic, username, text, createdAt }) => {
  return (
    <div className={s.comment}>
      <img src={profilePic ?? "/assets/noAvatar.png"} alt="avatar" />
      <div className={s.info}>
        <span>{username}</span>
        <p>{text}</p>
      </div>
      <span className={s.date}>
        {timeStringBetweenDates(new Date(), new Date(createdAt))}
      </span>
    </div>
  );
};

export default Comment;
