import { FC, ChangeEvent } from "react";
import s from "./ContactsSearch.module.css";

interface IContactsSearch {
  search: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ContactsSearch: FC<IContactsSearch> = ({ search, onChange }) => {
  return (
    <section className={s.container}>
      <input type="text" value={search} onChange={onChange} />
    </section>
  );
};

export default ContactsSearch;
