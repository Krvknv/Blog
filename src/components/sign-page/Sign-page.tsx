import React from 'react';

import { Typography } from 'antd';
import { Button, Form, Input } from 'antd';

import styles from './sign-page.module.css';
import { useAppDispatch, useAppSelector } from 'features/redux';
import { enterUser, registerUser } from 'API/userApi';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const SignPage = () => {
  const dispatch = useAppDispatch();

  const { isExist, incorrectValue } = useAppSelector((state) => state.userSlice);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const userName = Form.useWatch('username', form);
  const userEmail = Form.useWatch('email', form);
  const userPassword = Form.useWatch('password', form);

  const handleRegister = () => {
    dispatch(registerUser({ username: userName, email: userEmail, password: userPassword }));
    navigate('/');
  };

  const handleEnter = () => {
    dispatch(enterUser({ email: userEmail, password: userPassword }));
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

export default SignPage;
