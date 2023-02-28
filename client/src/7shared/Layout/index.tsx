import { Outlet } from "react-router-dom";

import Menu from "./Menu";
import NavBar from "./NavBar";
// import RightBar from "./RightBar";

import s from "./layout.module.css";

const Layout = () => {
  // const []
  return (
    <>
      <NavBar />
      <Menu />
      <main className={s.main}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
