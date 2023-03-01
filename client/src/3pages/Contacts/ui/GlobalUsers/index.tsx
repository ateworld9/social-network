import { useAppDispatch, useTypedSelector } from "@shared/hooks";

import { UserRow } from "./User";

import { selectFiltredUsersIds, fetchAddToContacts } from "../../model";

import s from "./GlobalUsers.module.css";

// interface IGlobalUsers {}

const selectAuthUserId = (state: RootState) => state.auth?.user?.userId;

const GlobalUsers = () => {
  const dispatch = useAppDispatch();

  const filtredUsersIds = useTypedSelector(selectFiltredUsersIds);

  const currentUserId = useTypedSelector(selectAuthUserId) as number;
  const handleAddToContacts = (addedUserId: number) => {
    dispatch(fetchAddToContacts({ currentUserId, addedUserId }));
  };

  return (
    <section className={s.container}>
      <h3>Global Search</h3>
      <div className={s.list}>
        {filtredUsersIds &&
          filtredUsersIds.map((userId) => (
            <UserRow
              key={userId}
              userId={userId}
              handleAddToContacts={handleAddToContacts}
            />
          ))}
      </div>
    </section>
  );
};

export default GlobalUsers;
