import React from 'react';

import { Space } from 'antd';
import { NavLink } from 'react-router-dom';

import styles from './Header.module.css';

const chooseLinkStyle = ({ isActive }: { isActive: boolean }) => {
  return isActive
    ? { color: '#ABB1A4', borderBottom: '2px solid #ABB1A4', fontSize: '16px' }
    : { color: '#000', fontSize: '16px' };
};

const Header = () => {
  return (
    <>
      <header className={styles.header}>
        <NavLink end to="/">
          <img src="/assets/isons/logo.svg" />
        </NavLink>

        <Space size="middle">
          <NavLink end to="/" style={chooseLinkStyle}>
            Home
          </NavLink>

          {/* <Button shape="round" size="large" onClick={toggleModal}>
            Sign In
          </Button>
          <Button
            shape="round"
            size="large"
            style={{ backgroundColor: '#ABB1A4', color: '#fff' }}
            onClick={toggleModal}
          >
            Sign Up
          </Button> */}

          <NavLink end to="/signIn" style={chooseLinkStyle}>
            Sign In
          </NavLink>
          <NavLink end to="/signUp" style={chooseLinkStyle}>
            Sign Up
          </NavLink>
        </Space>
      </header>
    </>
  );
};

export default Header;
