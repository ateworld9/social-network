import cn from "classnames";
import dayjs from "dayjs";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

import { useTypedSelector } from "@shared/hooks";

import { selectAuthUserId } from "@entities/auth";
import { UsernameLink, UserAvatarLink, userModel } from "@entities/user";
import { chatsModel } from "@entities/chat";

import s from "./chat.module.css";

type ChatProps = {
  chatId: ChatId;
};

const Chat = ({ chatId }: ChatProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/chat/${chatId}`);
  };

  const chat = useTypedSelector((state) =>
    chatsModel.selectById(state, chatId),
  ) as Chat;

  const authUserId = useTypedSelector(selectAuthUserId);
  const userId = chat.members.find((member) => member.userId !== authUserId)
    ?.userId as number;
  const user = useTypedSelector((state) =>
    userModel.selectById(state, userId),
  ) as User;

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <section className={s.container} onClick={handleClick}>
      {chat.type === "dialog" && (
        <div className={s.user}>
          <UserAvatarLink
            userId={userId}
            filename={user.avatar}
            className={s.avatar}
          />
          <div className={s.userInfo}>
            <UsernameLink
              userId={userId}
              name={user.name}
              surname={user.surname}
              tag
              username={user.username}
            />
            <div className={s.lastMessage}>
              <span className={s.text}>{chat.lastMessage.text}</span>
              <span className={s.date}>
                {dayjs(chat.lastMessage.createdAt).calendar()}
              </span>
            </div>
          </div>
        </div>
      )}
      {chat.type === "conference" && (
        <div className={s.conf}>
          <div className={cn(s.avatar, s.link)}>
            <img src="/images/meeting.png" alt="conference pic" />
          </div>
          <div className={s.chatInfo}>
            <div className={cn(s.link)}>
              {chat.chatName && <span>{chat.chatName}</span>}
            </div>
            <div className={s.lastMessage}>
              <span className={s.text}>{chat.lastMessage.text}</span>
              <span className={s.date}>
                {dayjs(chat.lastMessage.createdAt).calendar()}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const MemoChat = memo(Chat);

export { Chat, MemoChat };
