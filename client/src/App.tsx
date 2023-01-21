import { useEffect } from "react";
import { RouterProvider, createBrowserRouter, Link } from "react-router-dom";

import { useAppDispatch } from "./hooks/store";
import { ThemeProvider } from "./hooks/themeContext";

import { fetchCheckAuth } from "./features/auth/authThunks";
import { ProtectedRoute, UnProtectedRoute } from "./pages/guards";
import Login from "./pages/Login";
import Registration from "./pages/Registration";

import Layout from "./features/Layout";

import Home from "./pages/Home";
import ProfilePage from "./pages/Profile";
import ContactsPage from "./pages/Contacts";
import ChatsPage from "./pages/Chats";

import Testovaya from "./Testovaya";

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
        element: <ProfilePage />,
      },
      {
        path: "/profile/:userId",
        element: <ProfilePage />,
      },
      {
        path: "/contacts",
        element: <ContactsPage />,
      },
      {
        path: "/chats",
        element: <ChatsPage />,
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

  {
    path: "/test",
    element: <Testovaya />,
  },
]);

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) dispatch(fetchCheckAuth());
  }, [dispatch]);

  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
