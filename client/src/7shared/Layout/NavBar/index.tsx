import { useContext } from "react";
import { Link } from "react-router-dom";

import { IconButton } from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import LogoutIcon from "@mui/icons-material/LogoutSharp";

import { fetchLogout, selectAuthUser } from "@entities/auth";
import { UsernameLink, UserAvatarLink } from "@entities/user";

import { useAppDispatch, useTypedSelector } from "@shared/hooks";
import { ThemeContext, ThemeEnum } from "@shared/hooks/themeContext";
import s from "./navbar.module.css";

const NavBar = () => {
  const dispatch = useAppDispatch();
  const user = useTypedSelector(selectAuthUser) as User;

  const handleLogout = () => {
    dispatch(fetchLogout());
  };

  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <nav className={s.navbar}>
      <Link className={s.logo} to="/">
        <span>worldsocial</span>
      </Link>

      <Link to="/test">
        <IconButton color="primary">
          <HomeOutlinedIcon className={s.icon} />
        </IconButton>
      </Link>

      {theme === ThemeEnum.light && (
        <IconButton
          color="primary"
          className={s.themeIcon}
          onClick={toggleTheme}
        >
          <WbSunnyOutlinedIcon className={s.icon} />
        </IconButton>
      )}
      {theme === ThemeEnum.dark && (
        <IconButton
          color="primary"
          className={s.themeIcon}
          onClick={toggleTheme}
        >
          <DarkModeOutlinedIcon className={s.icon} />
        </IconButton>
      )}
      <div className={s.search}>
        <SearchOutlinedIcon className={s.icon} />
        <input type="text" placeholder="Search..." />
      </div>

      <div className={s.user}>
        <UserAvatarLink userId={user.userId} filename={user.avatar} />
        <UsernameLink
          userId={user.userId}
          name={user.name}
          surname={user.surname}
          username={user.username}
        />
      </div>

      <IconButton color="error" className={s.logout} onClick={handleLogout}>
        <LogoutIcon className={s.icon} />
      </IconButton>
    </nav>
  );
};

export default NavBar;
