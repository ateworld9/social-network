import { useEffect } from "react";
import { RouterProvider, createBrowserRouter, Link } from "react-router-dom";

import { useAppDispatch } from "./hooks/store";
import { ThemeProvider } from "./hooks/themeContext";

import { fetchCheckAuth } from "./features/auth/authThunks";
import { ProtectedRoute, UnProtectedRoute } from "./pages/guards";
import Login from "./pages/Login";
import Registration from "./pages/Registration";

import Layout from "./features/Layout";
import ProfileContainer from "./features/Profile";

import Home from "./features/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <ProfileContainer />,
      },
      {
        path: "/profile/:userId",
        element: <ProfileContainer />,
      },
    ],
    errorElement: (
      <div>
        <Link to="/">Home</Link>
        <p>Красивая страничка с 404 нот фаунд</p>
      </div>
    ),
  },
  {
    path: "/login",
    element: (
      <UnProtectedRoute>
        <Login />
      </UnProtectedRoute>
    ),
  },
  {
    path: "/registration",
    element: (
      <UnProtectedRoute>
        <Registration />
      </UnProtectedRoute>
    ),
  },
]);

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) dispatch(fetchCheckAuth());
  }, [dispatch]);

  return (
    <ThemeProvider>
      <RouterProvider router={router} />;
    </ThemeProvider>
  );
}

export default App;
