import { createBrowserRouter, Link } from "react-router-dom";
import Layout from "@shared/Layout";
import { ProtectedRoute, UnProtectedRoute } from "@entities/auth/guards";

import Login from "@pages/Login";
import Registration from "@pages/Registration";
import Home from "@pages/Home";
import { ProfilePage } from "@pages/Profile";
import { ContactsPage } from "@pages/Contacts";
import ChatsPage from "@pages/Chats";
import ChatPage from "@pages/Chat";

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
