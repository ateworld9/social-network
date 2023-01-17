import { FC, ChangeEvent } from "react";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import s from "./ContactsSearch.module.css";

interface IContactsSearch {
  search: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ContactsSearch: FC<IContactsSearch> = ({ search, onChange }) => {
  return (
    <section className={s.container}>
      <SearchOutlinedIcon className={s.icon} />
      <input
        type="text"
        value={search}
        onChange={onChange}
        placeholder="Name Surname"
        className={s.search}
      />
    </section>
  );
};

export default ContactsSearch;
