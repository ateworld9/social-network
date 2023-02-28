import dayjs from "dayjs";
import { memo } from "react";

import { User } from "../../../../6entities/user";

import s from "./index.module.css";

const PostHeader = ({ userId, createdAt }: any) => {
  return (
    <header className={s.user}>
      <User userId={userId as number} link>
        <time className={s.date}>{dayjs(createdAt).calendar()}</time>
      </User>
    </header>
  );
};

const MemoPostHeader = memo(PostHeader);

export { PostHeader, MemoPostHeader };
