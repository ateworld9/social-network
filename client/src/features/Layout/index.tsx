import { FC } from "react";
import { Outlet } from "react-router-dom";

import LeftBar from "./LeftBar";
import NavBar from "./NavBar";
import RightBar from "./RightBar";

import s from "./layout.module.css";

const Layout: FC = () => {
  return (
    <>
      <NavBar />
      <div style={{ display: "flex" }}>
        <LeftBar />
        <main className={s.main}>
          <Outlet />
        </main>
        <RightBar />
      </div>
    </>
  );
};

export default Layout;
