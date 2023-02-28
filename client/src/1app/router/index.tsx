import { createBrowserRouter, Link } from "react-router-dom";
import { ProtectedRoute, UnProtectedRoute } from "../../6entities/auth/guards";
import Login from "../../3pages/Login";
import Registration from "../../3pages/Registration";

import Layout from "../../7shared/Layout";

import Home from "../../3pages/Home";
import { ProfilePage } from "../../3pages/Profile";
import { ContactsPage } from "../../3pages/Contacts";
import ChatsPage from "../../3pages/Chats";
import ChatPage from "../../3pages/Chat";

import Testovaya from "../../Testovaya";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "profile/:userId",
        element: <ProfilePage />,
      },
      {
        path: "contacts",
        element: <ContactsPage />,
      },
      {
        path: "chats",
        element: <ChatsPage />,
      },
      {
        path: "chat/:chatId",
        element: <ChatPage />,
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
