import { createBrowserRouter } from 'react-router-dom';

import RootLayout from '@/layouts/rootLayout';
import Home from '@/pages/Home';
import Signup from '@/pages/Signup';
import Login from '@/pages/Login';
import ForgotPassword from '@/pages/Forgot-Password';
import NotFound from '@/pages/Not-Found';
import Contact from '@/pages/Contact';
import About from '@/pages/About';
import SearchPhysio from '@/pages/Search-Physio';
import HomeVisitNetwork from '@/pages/Home-Network';
import OnlineNetwork from '@/pages/Online-Network';
import ClinicNetwork from '@/pages/Clinic-Network';
import PhysioDetail from '@/pages/Physio/[id]';
import Blog from '@/pages/Blog';
import BlogDetail from '@/pages/Blog/[slug]';

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
      { path: '/search', element: <SearchPhysio /> },
      { path: '/physio/:id', element: <PhysioDetail /> },
      { path: '/network/home', element: <HomeVisitNetwork /> },
      { path: '/network/online', element: <OnlineNetwork /> },
      { path: '/network/clinic', element: <ClinicNetwork /> },
      { path: '/blog', element: <Blog /> },
      { path: '/blog/:slug', element: <BlogDetail /> },
      { path: '/booking', element: <div>Booking Page</div> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
