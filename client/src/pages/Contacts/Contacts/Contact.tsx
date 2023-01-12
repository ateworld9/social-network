import { FC } from "react";
import { User as IUser } from "../../../@types/User";
import s from "./Contacts.module.css";

const Contact: FC<IUser> = ({ username, name, surname, profilePic }) => {
  return (
    <div className={s.container}>
      <div className={s.avatar}>
        <img src={profilePic ?? "/assets/noAvatar.png"} alt="avatar" />
      </div>
      <div>
        <span>{name && surname ? `${name} ${surname}` : username}</span>
      </div>
    </div>
  );
};

export default Contact;
