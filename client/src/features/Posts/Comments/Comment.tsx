import { FC } from "react";
import s from "./comment.module.css";

import type { Comment as IComment } from "../../../models/Comment";

const Comment: FC<IComment> = ({ profilePic, username, text }) => (
  <div className={s.comment}>
    <img src={profilePic ?? "/assets/noAvatar.png"} alt="avatar" />
    <div className={s.info}>
      <span>{username}</span>
      <p>{text}</p>
    </div>
    <span className={s.date}>1 hour ago</span>
  </div>
);

export default Comment;
