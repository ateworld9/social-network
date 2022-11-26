import './navbar.scss';

import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import {ThemeContext, themeEnum} from '@src/themeContext';
import {useContext} from 'react';
import {Link} from 'react-router-dom';

import noAvatar from '../../assets/noAvatar.png';

// import Avatar from './myAvatar.jpg';

export const NavBar: React.FC = () => {
  const {theme, toggleTheme} = useContext(ThemeContext);
  return (
    <nav className="navbar">
      <div className="left">
        <Link to="/" style={{textDecoration: 'none'}}>
          <span>worldsocial</span>
        </Link>
        <HomeOutlinedIcon />
        {theme === themeEnum.light && (
          <WbSunnyOutlinedIcon onClick={toggleTheme} />
        )}
        {theme === themeEnum.dark && (
          <DarkModeOutlinedIcon onClick={toggleTheme} />
        )}
        <GridViewOutlinedIcon />
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <PersonOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <div className="user">
          <img src={noAvatar} alt="avatar" />
          <span>John Doe</span>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
