import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import MainLayout from '@/layouts/MainLayout';
// import Home from '@/pages/Home';
// import SubmitCase from '@/pages/SubmitCase';
// import AlertsMap from '@/pages/AlertsMap';
// import Search from '@/pages/Search';
import Resources from '@/pages/Resources';
// import Volunteer from '@/pages/Volunteer';
// import About from '@/pages/About';
// import Privacy from '@/pages/Privacy';
// import SuccessStories from '@/pages/SuccessStories';
// import OfflineToolkit from '@/pages/OfflineToolkit';
// import PartnerPortal from '@/pages/PartnerPortal';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* <Route element={<MainLayout />}> */}
          {/* <Route index element={<Home />} />
          <Route path="submit" element={<SubmitCase />} />
          <Route path="alerts" element={<AlertsMap />} />
          <Route path="search" element={<Search />} /> */}
         <Route path="/" element={<Resources />} />

          {/* <Route path="volunteer" element={<Volunteer />} />
          <Route path="about" element={<About />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="stories" element={<SuccessStories />} />
          <Route path="toolkit" element={<OfflineToolkit />} />
          <Route path="partners" element={<PartnerPortal />} /> */}
        {/* </Route> */}
      </Routes>
    </Router>
  );
}

export default AppRoutes;
