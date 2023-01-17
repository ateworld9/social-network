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
      <h3>Global Search</h3>
      <div className={s.list}>
        {users.map((user) => (
          <User
            key={user.userId}
            {...user}
            handleAddToContacts={handleAddToContacts}
          />
        ))}
      </div>
    </section>
  );
};

export default GlobalUsers;
