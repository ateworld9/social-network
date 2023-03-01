import cn from "classnames";
import { useContext, useCallback } from "react";
import { Link } from "react-router-dom";

import { IconButton } from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import LogoutIcon from "@mui/icons-material/LogoutSharp";

import { fetchLogout } from "@entities/auth";
import { User } from "@entities/user";

import { useAppDispatch, useTypedSelector } from "@shared/hooks";
import { ThemeContext, ThemeEnum } from "@shared/hooks/themeContext";
import s from "./navbar.module.css";

const selectAuthUser = (state: RootState) => state.auth.user?.userId;

const NavBar = () => {
  const dispatch = useAppDispatch();
  const userId = useTypedSelector(selectAuthUser) as number;

  const handleLogout = useCallback(() => {
    dispatch(fetchLogout());
  }, [dispatch]);

  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <nav className={s.navbar}>
      <Link key={1} className={s.logo} to="/">
        <span>worldsocial</span>
      </Link>

      <Link key={2} className={s.icon} to="/test">
        <HomeOutlinedIcon />
      </Link>

      {theme === ThemeEnum.light && (
        <WbSunnyOutlinedIcon
          className={cn(s.themeIcon, s.icon)}
          onClick={toggleTheme}
        />
      )}
      {theme === ThemeEnum.dark && (
        <DarkModeOutlinedIcon
          className={cn(s.themeIcon, s.icon)}
          onClick={toggleTheme}
        />
      )}
      {/* <GridViewOutlinedIcon key={4} className={s.icon} /> */}
      <div key={5} className={s.search}>
        <SearchOutlinedIcon className={s.icon} />
        <input type="text" placeholder="Search..." />
      </div>
      <User userId={userId as number} link />
      <IconButton
        key={7}
        color="error"
        className={s.logout}
        onClick={handleLogout}
      >
        <LogoutIcon className={s.icon} />
      </IconButton>
    </nav>
  );
};

export default NavBar;
