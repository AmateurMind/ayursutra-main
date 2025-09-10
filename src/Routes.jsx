import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import TherapyBooking from './pages/therapy-booking';
import PatientRegistration from './pages/patient-registration';
import PatientDashboard from './pages/patient-dashboard';
import TherapyPreparation from './pages/therapy-preparation';
import PatientLogin from './pages/patient-login';
import PractitionerCalendar from './pages/practitioner-calendar';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<PatientDashboard />} />
        <Route path="/therapy-booking" element={<TherapyBooking />} />
        <Route path="/patient-registration" element={<PatientRegistration />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/therapy-preparation" element={<TherapyPreparation />} />
        <Route path="/patient-login" element={<PatientLogin />} />
        <Route path="/practitioner-calendar" element={<PractitionerCalendar />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
