import { FC } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";

import { User as TUser, UserId } from "../../../@types/User";

import s from "./User.module.css";

type IUser = TUser & {
  handleAddToContacts: (userId: UserId) => void;
};

const User: FC<IUser> = ({
  userId,
  username,
  name,
  surname,
  profilePic,
  handleAddToContacts,
}) => {
  return (
    <div className={s.container}>
      <Link className={cn(s.avatar, s.link)} to={`/profile/${userId}`}>
        <img src={profilePic.filepath ?? "/assets/noAvatar.png"} alt="avatar" />
      </Link>
      <div>
        <Link className={cn(s.link)} to={`/profile/${userId}`}>
          {name && surname ? (
            <span className={s.fullname}>
              {name} {surname}
            </span>
          ) : (
            <span className={s.username}>{username}</span>
          )}
        </Link>
      </div>
      <div className={s.controllers}>
        <button
          className={s.addContact}
          type="button"
          onClick={() => handleAddToContacts(userId)}
        >
          Add to Contact
        </button>
      </div>
    </div>
  );
};

export default User;
