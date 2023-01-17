import { FC } from "react";
import { User as IUser } from "../../../@types/User";

import Contact from "./Contact";

import s from "./Contacts.module.css";

interface IContacts {
  contacts: IUser[];
}

const Contacts: FC<IContacts> = ({ contacts }) => {
  return (
    <section className={s.container}>
      <h3>Your Friends</h3>
      {contacts.map((contact) => (
        <Contact key={contact.userId} {...contact} />
      ))}
    </section>
  );
};

export default Contacts;
