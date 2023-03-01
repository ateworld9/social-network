import { Avatar } from "@mui/material";
import { API_BASE } from "@shared/config";
import { Link } from "react-router-dom";
import { useTypedSelector } from "@shared/hooks";

import { selectById } from "../model";

import s from "./User.module.css";

type UserProps = {
  userId: UserId;
  link?: boolean;
  children?: React.ReactNode;
};

export const User = ({ userId, link, children }: UserProps) => {
  const user = useTypedSelector((state) => selectById(state, userId)) as User;

  if (link) {
    return (
      <div className={s.user}>
        <Link to={`/profile/${userId}`}>
          <Avatar
            src={`${API_BASE}/public/images/${
              user?.profilePic?.filename ?? "/public/assets/noAvatar.png"
            }`}
            alt="avatar"
            className={s.avatar}
            sx={{ height: "2em !important", width: "2em !important" }}
          />
        </Link>
        {children ? (
          <div className={s.container}>
            <Link to={`/profile/${userId}`} className={s.link}>
              <span className={s.username}>
                {user.name && user.surname
                  ? `${user.name} ${user.surname}`
                  : user.username}
              </span>
            </Link>
            {children}
          </div>
        ) : (
          <Link to={`/profile/${userId}`} className={s.link}>
            <span className={s.username}>
              {user.name && user.surname
                ? `${user.name} ${user.surname}`
                : user.username}
            </span>
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className={s.user}>
      <Avatar
        src={`${API_BASE}/public/images/${
          user?.profilePic?.filename ?? "/public/assets/noAvatar.png"
        }`}
        alt="avatar"
        className={s.avatar}
        sx={{ height: "2em !important", width: "2em !important" }}
      />
      {children ? (
        <div className={s.container}>
          <span className={s.username}>
            {user.name && user.surname
              ? `${user.name} ${user.surname}`
              : user.username}
          </span>
          {children}
        </div>
      ) : (
        <span className={s.username}>
          {user.name && user.surname
            ? `${user.name} ${user.surname}`
            : user.username}
        </span>
      )}
    </div>
  );
};
