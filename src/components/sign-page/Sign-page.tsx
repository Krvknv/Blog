import React from 'react';
import { useAppDispatch, useAppSelector } from 'features/redux';

import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import { Button, Form, Input, Typography } from 'antd';
const { Title, Text } = Typography;

import { enterUser, registerUser } from 'API/userApi';

import styles from './sign-page.module.css';

export const SignPage = () => {
  const { isExist, incorrectValue } = useAppSelector((state) => state.userSlice);
  const { pathname } = useLocation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const username = Form.useWatch('username', form);
  const email = Form.useWatch('email', form);
  const password = Form.useWatch('password', form);

  // useCallback
  const handleRegister = () => {
    dispatch(registerUser({ username, email, password }));
    navigate('/');
  };

  const handleEnter = () => {
    dispatch(enterUser({ email, password }));
    navigate('/');
  };

  return (
    <>
      <Title level={2} style={{ marginBottom: '40px' }} className={styles.title}>
        {pathname === '/sign-in' ? 'Welcome' : 'Join us'}
      </Title>

      <Form form={form} layout="vertical" name="basic" autoComplete="off" className={styles.form}>
        {pathname === '/sign-up' && (
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
        )}

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        {isExist && (
          <Form.Item>
            <Text type="danger">This person is already registered</Text>
          </Form.Item>
        )}

        {incorrectValue && (
          <Form.Item>
            <Text type="danger">Incorrect values</Text>
          </Form.Item>
        )}

        {pathname === '/sign-in' ? (
          <Text className={styles.subtitle}>
            Don not have an account yet?
            <NavLink to="/sign-up" style={{ color: '#ABB1A4' }}>
              Sign Up
            </NavLink>
          </Text>
        ) : (
          <Text className={styles.subtitle}>
            Already have an account?
            <NavLink to="/sign-in" style={{ color: '#ABB1A4' }}>
              Sign In
            </NavLink>
          </Text>
        )}

        <Form.Item wrapperCol={{ offset: 10 }}>
          {pathname === '/sign-in' ? (
            <Button
              shape="round"
              size="large"
              type="primary"
              htmlType="submit"
              style={{ backgroundColor: '#ADC5A2' }}
              onClick={handleEnter}
            >
              Enter
            </Button>
          ) : (
            <Button
              shape="round"
              size="large"
              type="primary"
              htmlType="submit"
              style={{ backgroundColor: '#ADC5A2' }}
              onClick={handleRegister}
            >
              Register
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  );
};
