import { useNavigate } from "react-router-dom";

import { IconButton } from "@mui/material";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { API_PREFIX } from "@shared/config";
import { useTypedSelector } from "@shared/hooks";

import { UserAvatarLink, userModel, UsernameLink } from "@entities/user";
import { chatsModel } from "@entities/chat";

import s from "./ChatHeader.module.css";

const ChatInfo = ({ chatName }: { chatName: string }) => {
  return (
    <div className={s.info}>
      <span className={s.name}>{chatName}</span>
    </div>
  );
};
type UserInfoProps = {
  userId: number;
  username: string;
  name: string | null;
  surname: string | null;
};
const UserInfo = ({ userId, name, surname, username }: UserInfoProps) => {
  return (
    <div className={s.info}>
      <UsernameLink
        userId={userId}
        name={name}
        surname={surname}
        username={username}
      />
      <span className={s.lastOnline}>lastonline</span>
    </div>
  );
};

type ChatHeaderProps = {
  chatId: number;
};

const ChatHeader = ({ chatId }: ChatHeaderProps) => {
  const navigate = useNavigate();

  const chat = useTypedSelector((state) =>
    chatsModel.selectById(state, chatId),
  ) as Chat;

  const user = useTypedSelector((state) =>
    userModel.selectById(state, chat.members[0].userId),
  ) as User;

  return (
    <header className={s.header}>
      <IconButton className={s.back} onClick={() => navigate(-1)}>
        <ArrowBackOutlinedIcon />
      </IconButton>
      {chat.type === "conference" && <ChatInfo chatName={chat.chatName} />}
      {chat.type === "dialog" && user && (
        <UserInfo
          userId={user.userId}
          username={user.username}
          name={user.name}
          surname={user.surname}
        />
      )}
      <div className={s.controls}>
        <div className={s.control}>
          <IconButton>
            <MoreHorizIcon />
          </IconButton>
        </div>
        <div className={s.control}>
          {chat.type === "dialog" && user && (
            <UserAvatarLink
              userId={user.userId}
              filename={user.avatar}
              alt="avatar"
              className={s.userAvatar}
            />
          )}
          {chat.type === "conference" && (
            <img
              src={`${API_PREFIX}/public/images/meeting.png`}
              alt="conference pic"
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
