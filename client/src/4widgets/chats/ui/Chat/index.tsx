import cn from "classnames";
import dayjs from "dayjs";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

import { useTypedSelector } from "../../../../7shared/hooks";

import { selectAuthUserId } from "../../../../6entities/auth";
import { User, userModel } from "../../../../6entities/user";

import s from "./chat.module.css";
import { chatsModel } from "../../../../6entities/chat";

type ChatProps = {} & Chat;

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
        <User userId={user.userId}>
          <div className={s.lastMessage}>
            <span className={s.text}>{chat.lastMessage.text}</span>
            <span className={s.date}>
              {dayjs(chat.lastMessage.createdAt).calendar()}
            </span>
          </div>
        </User>
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
