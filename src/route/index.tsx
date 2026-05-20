import { createBrowserRouter } from 'react-router-dom';

import PatientLayout from '@/layouts/PatientLayout';
import ProtectedLayout from '@/layouts/ProtectedLayout';
import RootLayout from '@/layouts/rootLayout';
import TherapistLayout from '@/layouts/TherapistLayout';
import About from '@/pages/About';
import Blog from '@/pages/Blog';
import BlogDetail from '@/pages/Blog/[slug]';
import BookingDetails from '@/pages/Booking/[id]';
import ClinicNetwork from '@/pages/Clinic-Network';
import Contact from '@/pages/Contact';
import ForgotPassword from '@/pages/Forgot-Password';
import Home from '@/pages/Home';
import HomeVisitNetwork from '@/pages/Home-Network';
import Login from '@/pages/Login';
import NotFound from '@/pages/Not-Found';
import OnlineNetwork from '@/pages/Online-Network';
import PhysioDetail from '@/pages/Physio/[id]';
import SearchPhysio from '@/pages/Search-Physio';
import Signup from '@/pages/Signup';
import PatientProfilePage from '@/pages/Patient/Profile';
import PatientMyBookings from '@/pages/Patient/My-Booking';
import TherapistProfile from '@/pages/Therapist/Profile';
import TherapistMyBookings from '@/pages/Therapist/My-Booking';
import PatientBookingDetail from '@/pages/Patient/My-Booking/[id]';

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
      {
        element: <ProtectedLayout />,
        children: [
          { path: '/settings', element: <div>Settings</div> },
          { path: '/my-issues', element: <div>My Issues</div> },
          {
            element: <PatientLayout />,
            children: [
              { path: '/booking/:id', element: <BookingDetails /> },
              { path: '/patient/profile', element: <PatientProfilePage /> },
              { path: '/patient/my-bookings', element: <PatientMyBookings /> },
              { path: '/patient/my-booking/:id', element: <PatientBookingDetail /> },
            ],
          },
          {
            element: <TherapistLayout />,
            children: [
              { path: '/therapist/profile', element: <TherapistProfile /> },
              { path: '/therapist/my-bookings', element: <TherapistMyBookings /> },
            ],
          },
        ],
      },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
