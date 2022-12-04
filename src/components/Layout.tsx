import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './header/Header';

const Layout = () => {
  return (
    <>
      <Header />
      <main className="main">
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Outlet />
        </div>
      </main>
    </>
  );
};
export default Layout;
