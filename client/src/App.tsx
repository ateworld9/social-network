import Layout from '@layouts/Layout';
import {Home, Login, Profile, Registration} from '@pages/index';
import {
  Link,
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';

import {ThemeProvider} from './themeContext';

const ProtectedRoute = ({children}: {children: JSX.Element}) => {
  const currentUser = true;

  if (!currentUser) {
    // dispatch error to snackbar
    return <Navigate to="/login" />;
  }
  return children;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/profile/:id',
        element: <Profile />,
      },
    ],
    errorElement: <Link to="/">Home</Link>,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/registration',
    element: <Registration />,
  },
]);

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />;
    </ThemeProvider>
  );
}

export default App;
