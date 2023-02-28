import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import { router } from "./router";

import socket from "../7shared/config/api/socket";
import { useAppDispatch, useTypedSelector } from "../7shared/hooks";
import { ThemeProvider } from "../hooks/themeContext";

import { fetchCheckAuth } from "../6entities/auth";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) dispatch(fetchCheckAuth());
  }, [dispatch]);

  const token = useTypedSelector((state) => state.auth.token);
  const isAuth = useTypedSelector((state) => state.auth.isAuth);

  useEffect(() => {
    socket.disconnect();
    if (isAuth) {
      socket.auth = { accessToken: token };
      socket.connect();
    }
  }, [isAuth, token]);

  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
