import { Button } from "@mui/material";

import { useTypedSelector } from "@shared/hooks";
import { UsernameLink, userModel, UserAvatarLink } from "@entities/user";

import s from "./UserRow.module.css";

type UserRowProps = {
  userId: UserId;
  handleAddToContacts: (userId: UserId) => void;
};

const UserRow = ({ userId, handleAddToContacts }: UserRowProps) => {
  const user = useTypedSelector((state) => userModel.selectById(state, userId));
  return user ? (
    <article className={s.container}>
      <UserAvatarLink
        userId={userId}
        filename={user.avatar}
        className={s.avatar}
      />
      <div className={s.main}>
        <UsernameLink
          userId={userId}
          name={user.name}
          surname={user.surname}
          tag
          username={user.username}
        />
        <div className={s.controllers}>
          <Button
            size="small"
            type="button"
            color="primary"
            variant="contained"
            className={s.addContact}
            onClick={() => handleAddToContacts(userId)}
          >
            Add to Contact
          </Button>
        </div>
      </div>
    </article>
  ) : (
    <article>
      user is not loaded Error
      <span>TODO: fetchUser Button</span>
    </article>
  );
};

export { UserRow };
