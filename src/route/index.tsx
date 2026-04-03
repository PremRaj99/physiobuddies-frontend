import { createBrowserRouter } from 'react-router-dom';

import RootLayout from '@/layouts/rootLayout';
import Home from '@/pages/Home';
import Signup from '@/pages/Signup';
import Login from '@/pages/Login';

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <Home /> },

      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
    ],
  },
]);
