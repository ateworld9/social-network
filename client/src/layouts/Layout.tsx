import '../theme.scss';

import {LeftBar, NavBar, RightBar} from '@components/index';
import classNames from 'classnames';
import {FC, useContext} from 'react';
import {Outlet} from 'react-router-dom';

import styles from '../components/Post/post.module.scss';
import {ThemeContext, themeEnum} from '../themeContext';

export const Layout: FC = () => {
  const {theme} = useContext(ThemeContext);
  return (
    <div
      className={classNames(
        `theme-${theme}`,
        theme === themeEnum.light ? styles.themeLight : styles.themeDark,
      )}
    >
      <NavBar />
      <div style={{display: 'flex'}}>
        <LeftBar />
        <main style={{flex: 5}}>
          <Outlet />
        </main>
        <RightBar />
      </div>
    </div>
  );
};

export default Layout;
