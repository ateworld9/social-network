import { useEffect } from "react";
import { useAppDispatch, useTypedSelector } from "@shared/hooks";
import { selectAuthUserId } from "@entities/auth";

import { fetchUserContacts, selectContactsIds } from "../../model";
import Contact from "./Contact";

import s from "./Contacts.module.css";

// type ContactsProps = {};

const Contacts = () => {
  const dispatch = useAppDispatch();

  const authUserId = useTypedSelector(selectAuthUserId) as number;

  useEffect(() => {
    if (authUserId) {
      dispatch(fetchUserContacts({ userId: authUserId }));
    }
  }, [dispatch, authUserId]);

  const contactsIds = useTypedSelector(selectContactsIds) as UserId[];

  return (
    <section className={s.container}>
      <h3>Your Friends</h3>
      {contactsIds &&
        contactsIds.map((userId) => <Contact key={userId} userId={userId} />)}
    </section>
  );
};

export default Contacts;
