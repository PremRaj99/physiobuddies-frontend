import { createBrowserRouter } from 'react-router-dom';

import RootLayout from '@/layouts/rootLayout';
import Home from '@/pages/Home';
import Signup from '@/pages/Signup';
import Login from '@/pages/Login';
import ForgotPassword from '@/pages/Forgot-Password';
import NotFound from '@/pages/Not-Found';
import Contact from '@/pages/Contact';
import About from '@/pages/About';

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <Home /> },

      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
      { path: '/forgot-password', element: <ForgotPassword /> },
      { path: '/contact', element: <Contact /> },
      { path: '/about', element: <About /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
