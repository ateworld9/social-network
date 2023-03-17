import cn from "classnames";
import { memo } from "react";

import { useTypedSelector } from "@shared/hooks";

import { Username, UserAvatar, userModel } from "@entities/user";

import s from "./chat.module.css";

type ChatProps = {} & Chat;

const User = ({ userId }: { userId: UserId }) => {
  const user = useTypedSelector((state) =>
    userModel.selectById(state, userId),
  ) as User;
  return (
    <div className={s.user}>
      <UserAvatar filename={user.avatar} className={s.avatar} />
      <div className={s.userInfo}>
        <Username
          name={user.name}
          surname={user.surname}
          username={user.username}
        />
      </div>
    </div>
  );
};

const Chat = (props, { type, members, chatName }: ChatProps) => {
  return (
    <li {...props} className={cn(s.li)}>
      <div className={s.container}>
        {type === "dialog" && <User userId={members[0].userId} />}

        {type === "conference" && (
          <div className={s.conf}>
            <div className={cn(s.avatar, s.link)}>
              <img src="/images/meeting.png" alt="conference pic" />
            </div>
            <div className={s.chatInfo}>
              <div className={cn(s.link)}>
                {chatName && <span>{chatName}</span>}
              </div>
            </div>
          </div>
        )}
      </div>
    </li>
  );
};

const MemoChat = memo(Chat);

export { Chat, MemoChat };
