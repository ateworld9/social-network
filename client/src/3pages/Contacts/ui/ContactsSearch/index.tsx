import { useState, ChangeEvent } from "react";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import { useAppDispatch } from "@shared/hooks";
import { fetchUsersSearch } from "../../model";

import s from "./ContactsSearch.module.css";

const ContactsSearch = () => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event?.target.value);

    dispatch(fetchUsersSearch({ fields: null, limit: 50 }));
  };
  return (
    <section className={s.container}>
      <SearchOutlinedIcon className={s.icon} />
      <input
        type="text"
        value={search}
        onChange={onSearchChange}
        placeholder="Name Surname"
        className={s.search}
      />
    </section>
  );
};

export default ContactsSearch;
