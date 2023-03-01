import { Link } from "react-router-dom";

import { User } from "@entities/user";
import { selectAuthUserId } from "@entities/auth";

import { useTypedSelector } from "@shared/hooks";

import s from "./leftbar.module.css";

const Menu = (): JSX.Element => {
  const userId = useTypedSelector(selectAuthUserId) as number;
  return (
    <aside className={s.leftBar}>
      <div className={s.menu}>
        <User userId={userId} link />
        <Link className={s.item} to="/contacts">
          <img src="/assets/1.png" alt="Contacts Icon" />
          <span>Contacts</span>
        </Link>
        <Link className={s.item} to="/chats">
          <img src="/assets/10.png" alt="Messages Icon" />
          <span>Messages</span>
        </Link>
      </div>
    </aside>
  );
};

export default Menu;
