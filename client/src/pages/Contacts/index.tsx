/* eslint-disable @typescript-eslint/no-shadow */
import { useState, FC, ChangeEvent, useCallback, useEffect } from "react";
import { useTypedSelector, useAppDispatch } from "../../hooks/store";

import {
  fetchUsersSearch,
  fetchUserContacts,
  fetchAddToContacts,
} from "./contactsThunks";

import ContactsSearch from "./ContactsSearch";
import GlobalUsers from "./GlobalUsers";
import Contacts from "./Contacts";

const ContactsPage: FC = () => {
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState("");
  const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event?.target.value);

    dispatch(fetchUsersSearch({ fields: null, limit: 50 }));
  };

  const userId = useTypedSelector((state) => state.auth.user?.userId);

  useEffect(() => {
    if (userId) dispatch(fetchUserContacts({ userId }));
  }, [dispatch, userId]);

  const contacts = useTypedSelector((state) => state.contacts.contacts);
  const users = useTypedSelector((state) => state.contacts.users);

  const handleAddToContacts = useCallback(
    (addedUserId: number) => {
      dispatch(
        fetchAddToContacts({ currentUserId: userId as number, addedUserId }),
      );
    },
    [dispatch, userId],
  );
  return (
    <>
      <ContactsSearch search={search} onChange={onSearchChange} />
      {contacts?.length && <Contacts contacts={contacts} />}
      {users?.length && (
        <GlobalUsers users={users} handleAddToContacts={handleAddToContacts} />
      )}
    </>
  );
};

export default ContactsPage;
