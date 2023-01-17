import { FC } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import { User as IUser } from "../../../@types/User";
import s from "./Contact.module.css";

const Contact: FC<IUser> = ({
  userId,
  username,
  name,
  surname,
  profilePic,
}) => {
  return (
    <div className={s.container}>
      <Link className={cn(s.avatar, s.link)} to={`/profile/${userId}`}>
        <img src={profilePic ?? "/assets/noAvatar.png"} alt="avatar" />
      </Link>
      <div className={s.userInfo}>
        <Link className={cn(s.link)} to={`/profile/${userId}`}>
          {name && surname ? (
            <span className={s.fullname}>
              {name} {surname}
            </span>
          ) : (
            <span className={s.username}>{username}</span>
          )}
        </Link>
        <Link to={`/chat/${userId}`}>Message</Link>
      </div>
    </div>
  );
};

export default Contact;
