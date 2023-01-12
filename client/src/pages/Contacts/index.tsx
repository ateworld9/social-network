import { useState, FC, ChangeEvent, useCallback } from "react";
import { useTypedSelector } from "../../hooks/store";

import ContactsSearch from "./ContactsSearch";
import GlobalUsers from "./GlobalUsers";
import Contacts from "./Contacts";

const ContactsPage: FC = () => {
  const [search, setSearch] = useState("");
  const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event?.target.value);

    // dispatch fetchSearchUsers
  };

  const contacts = useTypedSelector((state) => state.contacts.contacts);
  const users = useTypedSelector((state) => state.contacts.users);

  const handleAddToContacts = useCallback((userId: number) => {
    console.log("TODO: handleAddToContacts", userId);

    // dispatch(fetchAddToContacts(userId))
  }, []);
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
