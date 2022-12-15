// import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useTypedSelector } from "../hooks/store";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuth = useTypedSelector((state) => state.auth.isAuth);
  // useEffect(() => {}, [])

  if (!isAuth) {
    return <Navigate to="/login" />;
  }
  return children;
};

export const UnProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuth = useTypedSelector((state) => state.auth.isAuth);

  if (isAuth) {
    return <Navigate to="/" />;
  }
  return children;
};
