import cn from "classnames";
import { useContext } from "react";
import { Link } from "react-router-dom";

import { IconButton } from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import LogoutIcon from "@mui/icons-material/LogoutSharp";

import s from "./navbar.module.css";

import { useAppDispatch, useTypedSelector } from "../../../hooks/store";
import { ThemeContext, ThemeEnum } from "../../../hooks/themeContext";

import { fetchLogout } from "../../auth/authThunks";

const NavBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useTypedSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(fetchLogout());
  };

  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <nav className={s.navbar}>
      <div className={s.left}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>worldsocial</span>
        </Link>
        <HomeOutlinedIcon className={s.icon} />
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
        <GridViewOutlinedIcon className={s.icon} />
        <div className={s.search}>
          <SearchOutlinedIcon className={s.icon} />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className={s.right}>
        <PersonOutlinedIcon className={s.icon} />
        <EmailOutlinedIcon className={s.icon} />
        <NotificationsOutlinedIcon className={s.icon} />
        <Link to="/profile" className={s.userLink}>
          <div className={s.user}>
            <img
              src={user?.profilePic ?? "/assets/noAvatar.png"}
              alt="avatar"
            />
            {user?.name && user?.surname ? (
              <span className={s.fullname}>
                {user.name} {user.surname}
              </span>
            ) : (
              <span className={s.username}>{user?.username}</span>
            )}
          </div>
        </Link>
        <IconButton
          color="error"
          // variant="contained"
          className={s.logout}
          onClick={handleLogout}
        >
          <LogoutIcon className={s.logoutIcon} />
        </IconButton>
        {/* Logout
        </Button> */}
      </div>
    </nav>
  );
};

export default NavBar;
