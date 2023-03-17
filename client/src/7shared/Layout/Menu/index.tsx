import classNames from "classnames";
import { Link } from "react-router-dom";

import { API_PREFIX } from "@shared/config";
import { useTypedSelector } from "@shared/hooks";

import { selectAuthUser } from "@entities/auth";
import { UserAvatarLink } from "@entities/user";

import s from "./index.module.css";

const Menu = (): JSX.Element => {
  const user = useTypedSelector(selectAuthUser) as User;

  return (
    <aside className={s.menu}>
      <div className={s.user}>
        <UserAvatarLink userId={user.userId} filename={user.avatar} />
        <Link
          to={`/profile/${user.userId}`}
          className={classNames(s.text, s.link)}
        >
          My Profile
        </Link>
      </div>
      <Link className={s.item} to="/contacts">
        <img src={`${API_PREFIX}/public/images/1.png`} alt="Contacts Icon" />
        <span className={s.text}>Contacts</span>
      </Link>
      <Link className={s.item} to="/chats">
        <img src={`${API_PREFIX}/public/images/10.png`} alt="Messages Icon" />
        <span className={s.text}>Messages</span>
      </Link>
    </aside>
  );
};

export default Menu;
