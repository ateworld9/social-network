import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import socket from "@shared/config/api/socket";
import { useAppDispatch, useTypedSelector } from "@shared/hooks";

import { fetchCheckAuth } from "@entities/auth";

import { router } from "./router";
import { ThemeProvider } from "../7shared/hooks/themeContext";

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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RouterProvider router={router} />
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
