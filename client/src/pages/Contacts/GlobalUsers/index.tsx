import { FC } from "react";
import { User as TUser } from "../../../@types/User";
import User from "./User";
import s from "./GlobalUsers.module.css";

interface IGlobalUsers {
  users: TUser[];
  handleAddToContacts: (userId: number) => void;
}

const GlobalUsers: FC<IGlobalUsers> = ({ users, handleAddToContacts }) => {
  return (
    <section className={s.container}>
      <h5>Global Search</h5>
      {users.map((user) => (
        <User
          key={user.userId}
          {...user}
          handleAddToContacts={handleAddToContacts}
        />
      ))}
    </section>
  );
};

export default GlobalUsers;
