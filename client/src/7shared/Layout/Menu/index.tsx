import { Link } from "react-router-dom";
import { useTypedSelector } from "../../hooks";
import { User } from "../../../6entities/user";
import s from "./leftbar.module.css";

import { selectAuthUserId } from "../../../6entities/auth";

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
