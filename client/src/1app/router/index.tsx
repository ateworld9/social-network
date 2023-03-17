import { lazy, Suspense } from "react";
import { createBrowserRouter, Link } from "react-router-dom";

import { LinearProgress } from "@mui/material";

import Layout from "@shared/Layout";
import { ProtectedRoute, UnProtectedRoute } from "@entities/auth/guards";

// import Login from "@pages/Login";
// import Registration from "@pages/Registration";
// import Home from "@pages/Home";
// import ChatsPage from "@pages/Chats";
// import ChatPage from "@pages/Chat";
import { ProfilePage } from "@pages/Profile";
import { EditPage } from "@pages/Edit";
import { ContactsPage } from "@pages/Contacts";

import Testovaya from "../../Testovaya";

const Login = lazy(() => import("@pages/Login"));
const Registration = lazy(() => import("@pages/Registration"));

const Home = lazy(() => import("@pages/Home"));
const ChatsPage = lazy(() => import("@pages/Chats"));
const ChatPage = lazy(() => import("@pages/Chat"));

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
        element: (
          <Suspense fallback={<LinearProgress />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "profile/:userId",
        element: <ProfilePage />,
      },
      {
        path: "edit",
        element: <EditPage />,
      },
      {
        path: "contacts",
        element: <ContactsPage />,
      },
      {
        path: "chats",
        element: (
          <Suspense fallback={<LinearProgress />}>
            <ChatsPage />
          </Suspense>
        ),
      },
      {
        path: "chat/:chatId",
        element: (
          <Suspense fallback={<LinearProgress />}>
            <ChatPage />
          </Suspense>
        ),
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
        <Suspense fallback={<LinearProgress />}>
          <Login />
        </Suspense>
      </UnProtectedRoute>
    ),
  },
  {
    path: "/registration",
    element: (
      <UnProtectedRoute>
        <Suspense fallback={<LinearProgress />}>
          <Registration />
        </Suspense>
      </UnProtectedRoute>
    ),
  },

  {
    path: "/test",
    element: <Testovaya />,
  },
]);
