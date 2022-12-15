import { useContext } from "react";
import { Link } from "react-router-dom";

import { Button } from "@mui/material";
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
        <HomeOutlinedIcon />
        {theme === ThemeEnum.light && (
          <WbSunnyOutlinedIcon className={s.themeIcon} onClick={toggleTheme} />
        )}
        {theme === ThemeEnum.dark && (
          <DarkModeOutlinedIcon className={s.themeIcon} onClick={toggleTheme} />
        )}
        <GridViewOutlinedIcon />
        <div className={s.search}>
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className={s.right}>
        <PersonOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <Link to="/profile" className={s.userLink}>
          <div className={s.user}>
            <img
              src={user?.profilePic ?? "/assets/noAvatar.png"}
              alt="avatar"
            />
            <span>{user?.username}</span>
          </div>
        </Link>
        <Button
          color="warning"
          variant="contained"
          size="medium"
          startIcon={<LogoutIcon />}
          sx={{
            fontSize: "12px",
            fontWeight: "700",
          }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </nav>
  );
};

export default NavBar;
