// import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useTypedSelector } from "../../7shared/hooks";

const selectIsAuth = (state: RootState) => state.auth.isAuth;

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuth = useTypedSelector(selectIsAuth);

  if (!isAuth) {
    return <Navigate to="/login" />;
  }
  return children;
};

export const UnProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuth = useTypedSelector(selectIsAuth);

  if (isAuth) {
    return <Navigate to="/" />;
  }
  return children;
};
