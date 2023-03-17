import classNames from "classnames";
import { Link } from "react-router-dom";

import { API_PREFIX } from "@shared/config";

import s from "./User.module.css";

const Username = ({
  name,
  surname,
  username,
  tag,
  className,
}: UsernameProps) => {
  return (
    <span className={classNames(s.username, className)}>
      {name && surname ? (
        <b>{`${name} ${surname} `}</b>
      ) : (
        !tag && <b>@{username}</b>
      )}
      {tag && <i>@{username}</i>}
    </span>
  );
};

const UsernameLink = ({ userId, ...args }: UsernameLinkProps) => {
  return (
    <Link to={`/profile/${userId}`} className={s.link}>
      <Username {...args} />
    </Link>
  );
};

const UserAvatar = ({ filename, className }: UserAvatarProps) => {
  return (
    <img
      src={`${API_PREFIX}/public/images/${filename ?? "noAvatar.png"}`}
      draggable="false"
      alt="avatar"
      className={classNames(s.avatar, className)}
    />
  );
};

const UserAvatarLink = ({ userId, ...args }: UserAvatarLinkProps) => {
  return (
    <Link to={`/profile/${userId}`} className={s.avatarlink}>
      <UserAvatar {...args} />
    </Link>
  );
};

export { Username, UsernameLink, UserAvatar, UserAvatarLink };
