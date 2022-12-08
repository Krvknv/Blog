import React from 'react';

import { Button, Space } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';

import styles from './Header.module.css';
import { useAppDispatch, useAppSelector } from 'features/redux';
import { setUserData } from 'features/slices/user-slice';

const chooseLinkStyle = ({ isActive }: { isActive: boolean }) => {
  return isActive
    ? { color: '#ABB1A4', borderBottom: '2px solid #ABB1A4', fontSize: '16px' }
    : { color: '#000', fontSize: '16px' };
};

const Header = () => {
  const dispatch = useAppDispatch();
  const { token, image, username } = useAppSelector((state) => state.userSlice);

  const navigate = useNavigate();

  const handleExit = () => {
    dispatch(setUserData({ username: '', email: '', token: '', bio: '', image: '' }));

    navigate('/');
  };
  return (
    <>
      <header className={styles.header}>
        <NavLink end to="/">
          <img src="/assets/icons/logo.svg" />
        </NavLink>

        <Space size="large">
          <NavLink end to="/" style={chooseLinkStyle}>
            Home
          </NavLink>

          {token ? (
            <>
              <NavLink to="/new-article" style={chooseLinkStyle}>
                New article
              </NavLink>

              <NavLink to="/profile" style={chooseLinkStyle} className={styles.profile}>
                <img src={image} className={styles.image} />
                {username}
              </NavLink>
              <NavLink to="/settings" style={chooseLinkStyle}>
                Settings
              </NavLink>

              <Button
                type="primary"
                shape="round"
                size="large"
                style={{ backgroundColor: '#ADC5A2' }}
                onClick={handleExit}
              >
                Sign out
              </Button>
            </>
          ) : (
            <>
              <NavLink to="/sign-in" style={chooseLinkStyle}>
                Sign In
              </NavLink>
              <NavLink to="/sign-up" style={chooseLinkStyle}>
                Sign Up
              </NavLink>
            </>
          )}
        </Space>
      </header>
    </>
  );
};

export default Header;
