import React, { useEffect } from 'react';

import { Typography } from 'antd';
import { Button, Form, Input } from 'antd';

const { Title, Text } = Typography;
const { TextArea } = Input;

import styles from './settings.module.css';
import { useAppDispatch, useAppSelector } from 'features/redux';
import { useNavigate } from 'react-router-dom';
import { editUser } from 'API/userApi';

const Settings = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { token, isExist } = useAppSelector((state) => state.userSlice);

  const [form] = Form.useForm();

  const userName = Form.useWatch('username', form);
  const userEmail = Form.useWatch('email', form);
  const userBio = Form.useWatch('bio', form);
  const userAvatar = Form.useWatch('avatar', form);
  const userPassword = Form.useWatch('password', form);

  useEffect(() => {
    if (!token) navigate('/');
  });

  const handleEdit = () => {
    const userData: { [index: string]: string } = {
      email: userEmail,
      password: userPassword,
      username: userName,
      bio: userBio,
      image: userAvatar,
    };

    const validatedData: { [index: string]: string } = {};

    for (const key in userData) {
      if (userData[key]) {
        validatedData[key] = userData[key];
      }
    }
    dispatch(editUser({ ...validatedData, token }));

    form.resetFields();
  };
  return (
    <>
      <Title level={2} style={{ marginBottom: '40px' }} className={styles.title}>
        Edit profile
      </Title>

      <Form form={form} layout="vertical" name="basic" autoComplete="off" className={styles.form}>
        <Form.Item label="Username" name="username">
          <Input />
        </Form.Item>

        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>

        <Form.Item label="Short bio about you" name="bio">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Add link on your avatar" name="avatar">
          <Input />
          {/* <ImgCrop rotate>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              maxCount={1}
              //   action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              onChange={handleChange}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </ImgCrop> */}
        </Form.Item>

        <Form.Item label="Password" name="password">
          <Input.Password />
        </Form.Item>

        {isExist && (
          <Form.Item>
            <Text type="danger">The person with these data exists</Text>
          </Form.Item>
        )}

        <Form.Item wrapperCol={{ offset: 10 }}>
          <Button
            shape="round"
            size="large"
            type="primary"
            htmlType="submit"
            style={{ backgroundColor: '#ADC5A2' }}
            onClick={handleEdit}
          >
            Edit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Settings;
