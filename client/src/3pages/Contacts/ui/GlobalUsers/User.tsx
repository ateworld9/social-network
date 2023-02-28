import { useTypedSelector } from "../../../../7shared/hooks";
import { User, userModel } from "../../../../6entities/user";

import s from "./User.module.css";

type UserRowProps = {
  userId: UserId;
  handleAddToContacts: (userId: UserId) => void;
};

const UserRow = ({ userId, handleAddToContacts }: UserRowProps) => {
  const user = useTypedSelector((state) => userModel.selectById(state, userId));
  return user ? (
    <div className={s.container}>
      <User userId={userId} link />
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
  ) : (
    <div>
      user is not loaded Error
      <span>TODO: fetchUser Button</span>
    </div>
  );
};

export { UserRow };
