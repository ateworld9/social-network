import cn from "classnames";
import { Link } from "react-router-dom";

import { API_PREFIX } from "@shared/config";
import { useTypedSelector } from "@shared/hooks";

import { userModel } from "@entities/user";

import { SendMessageButton } from "@features/send-message-to-user";

import s from "./Contact.module.css";

type ContactProps = { userId: UserId };

const Contact = ({ userId }: ContactProps) => {
  const contact = useTypedSelector((state) =>
    userModel.selectById(state, userId),
  );

  return contact ? (
    <div className={s.container}>
      <Link className={cn(s.avatar, s.link)} to={`/profile/${userId}`}>
        <img
          src={`${API_PREFIX}/public/images/${
            contact?.profilePic?.filename ?? "noAvatar.png"
          }`}
          alt="avatar"
        />
      </Link>
      <div className={s.userInfo}>
        <Link className={cn(s.link)} to={`/profile/${userId}`}>
          {contact.name && contact.surname ? (
            <span className={s.fullname}>
              {contact.name} {contact.surname}
            </span>
          ) : (
            <span className={s.username}>{contact.username}</span>
          )}
        </Link>
        <SendMessageButton toUserId={userId} />
      </div>
    </div>
  ) : (
    <div>Contact is not loaded</div>
  );
};

export default Contact;
