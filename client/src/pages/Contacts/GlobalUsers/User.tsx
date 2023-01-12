import { FC } from "react";
import { User as TUser } from "../../../@types/User";
import s from "./User.module.css";

type IUser = TUser & {
  handleAddToContacts: (userId: number) => void;
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
      <div className={s.avatar}>
        <img src={profilePic ?? "/assets/noAvatar.png"} alt="avatar" />
      </div>
      <div>
        <span>{name && surname ? `${name} ${surname}` : username}</span>
      </div>
      <div>
        <button type="button" onClick={() => handleAddToContacts(userId)}>
          Add to Contact
        </button>
      </div>
    </div>
  );
};

export default User;
