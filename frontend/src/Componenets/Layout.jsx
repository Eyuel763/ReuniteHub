import { Outlet } from 'react-router-dom';
import React from 'react';
import Header from './Header';
import Footer from './Footer'; // Assuming you have a Footer component

const Layout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
};

export default Layout;