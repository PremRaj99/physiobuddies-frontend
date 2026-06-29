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
import SettingsPage from '@/pages/Setting';
import RefundPolicy from '@/pages/Refund-Policy';
import PrivacyPolicy from '@/pages/Privacy-Policy';
import TermsConditions from '@/pages/Terms';
import Issue from '@/pages/Issue';
import TherapistBookingDetailPage from '@/pages/Therapist/My-Booking/[id]';
import SlotManagement from '@/pages/Therapist/Slot-Management';
import CommissionHistory from '@/pages/Therapist/Commission-History';
import TherapistOnboardingPage from '@/pages/Therapist/Onboarding';
import TherapistFinalOnboarding from '@/pages/Therapist/FinalOnboarding';
import Subscription from '@/pages/Therapist/Subscription';
import CreateAssessment from '@/pages/Therapist/My-Booking/[id]/Create-Assessment';

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
      { path: '/refund-policy', element: <RefundPolicy /> },
      { path: '/privacy-policy', element: <PrivacyPolicy /> },
      { path: '/terms', element: <TermsConditions /> },
      {
        element: <ProtectedLayout />,
        children: [
          { path: '/settings', element: <SettingsPage /> },
          { path: '/my-issues', element: <Issue /> },
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
              { path: '/therapist/onboarding', element: <TherapistOnboardingPage /> },
              { path: '/therapist/onboarding/final', element: <TherapistFinalOnboarding /> },
              { path: '/therapist/profile', element: <TherapistProfile /> },
              { path: '/therapist/my-bookings', element: <TherapistMyBookings /> },
              { path: '/therapist/my-booking/:id', element: <TherapistBookingDetailPage /> },
              {
                path: '/therapist/my-booking/:id/create-assessment',
                element: <CreateAssessment />,
              },
              { path: '/therapist/slot-management', element: <SlotManagement /> },
              { path: '/therapist/subscriptions', element: <Subscription /> },
              { path: '/therapist/commission-history', element: <CommissionHistory /> },
            ],
          },
        ],
      },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
