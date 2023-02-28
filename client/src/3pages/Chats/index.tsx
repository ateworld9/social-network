import { InputBase } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import { Chats } from "../../4widgets/chats";

import s from "./ChatsPage.module.css";

const ChatsPage = () => {
  return (
    <div className={s.container}>
      <section className={s.search}>
        <InputBase
          fullWidth
          placeholder="Search"
          startAdornment={<SearchOutlinedIcon className={s.icon} />}
        />
      </section>
      <hr className={s.divider} />
      <Chats />
    </div>
  );
};

export default ChatsPage;
