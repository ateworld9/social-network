import { Link } from "react-router-dom";
import { useTypedSelector } from "../../../7shared/hooks";

import { selectById } from "../model";

import s from "./User2.module.css";

type AvatarProps = {
  userId: UserId;
  link?: boolean;
};

const Avatar = ({ userId, link }: AvatarProps) => {
  const user = useTypedSelector((state) => selectById(state, userId)) as User;

  if (link) {
    return (
      <Link to={`/profile/${userId}`}>
        <img
          src={user?.profilePic?.filepath ?? "/assets/noAvatar.png"}
          alt="avatar"
          className={s.avatar}
        />
      </Link>
    );
  }

  return (
    <img
      src={user?.profilePic?.filepath ?? "/assets/noAvatar.png"}
      alt="avatar"
      className={s.avatar}
    />
  );
};

type UsernameProps = {
  userId: UserId;
  link?: boolean;
};

const Username = ({ userId, link }: UsernameProps) => {
  const user = useTypedSelector((state) => selectById(state, userId)) as User;

  if (link) {
    return (
      <Link to={`/profile/${userId}`} className={s.link}>
        <span className={s.username}>
          {user.name && user.surname
            ? `${user.name} ${user.surname}`
            : user.username}
        </span>
      </Link>
    );
  }

  return (
    <span className={s.username}>
      {user.name && user.surname
        ? `${user.name} ${user.surname}`
        : user.username}
    </span>
  );
};

type UserProps = {
  userId: UserId;
  link?: boolean;
  children?: React.ReactNode;
};

const User = ({ children }: UserProps) => {
  return children;
};

User.Avatar = Avatar;
User.Username = Username;

export { User };
