import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './footer/Footer';
import Header from './header/Header';

const Layout = () => {
  return (
    <>
      <Header />
      <main className="main">
        <Outlet />
        {/* <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}></div> */}
      </main>
      <Footer />
    </>
  );
};
export default Layout;
