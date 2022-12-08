import React, { useEffect, useState } from 'react';

import { Typography } from 'antd';
import { Button, Form, Input } from 'antd';

const { Title, Text } = Typography;
const { TextArea } = Input;

import styles from './create-article-page.module.css';
import { createArticle } from 'API/articlesApi';
import { useAppSelector } from 'features/redux';
import { useNavigate } from 'react-router-dom';

const CreateArticlePage = () => {
  const navigate = useNavigate();

  const { token } = useAppSelector((state) => state.userSlice);

  const [form] = Form.useForm();

  const title = Form.useWatch('title', form);
  const about = Form.useWatch('about', form);
  const text = Form.useWatch('text', form);
  const tags = Form.useWatch('tags', form);

  const [isUniq, setIsUniq] = useState(false);

  const handleCreate = async () => {
    const tagsArr = tags.split(',');

    const articleData = {
      title,
      description: about,
      body: text,
      tagList: tagsArr,
    };

    const response = await createArticle(articleData, token);
    if (response.errors.title.includes('must be unique')) {
      setIsUniq(true);
    }
  };

  useEffect(() => {
    if (!token) navigate('/');
  });

  return (
    <>
      <Title level={2} style={{ marginBottom: '40px' }} className={styles.title}>
        Create new article
      </Title>

      <Form form={form} layout="vertical" name="basic" autoComplete="off" className={styles.form}>
        <Form.Item
          label="Article title"
          name="title"
          rules={[{ required: true, message: "Please input article's title!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="What's this article about"
          name="about"
          rules={[{ required: true, message: 'Please input what this article about!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Write your article"
          name="text"
          rules={[{ required: true, message: "Please input article's text!" }]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Write article's tags (separated by commas)"
          name="tags"
          rules={[
            { required: true, message: "Please input article's tags (separated by commas)!" },
          ]}
        >
          <Input />
        </Form.Item>

        {isUniq && (
          <Form.Item>
            <Text type="danger">The article already exists</Text>
          </Form.Item>
        )}

        <Form.Item wrapperCol={{ offset: 10 }}>
          <Button
            type="primary"
            shape="round"
            size="large"
            htmlType="submit"
            style={{ backgroundColor: '#ADC5A2' }}
            onClick={handleCreate}
          >
            Create article
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateArticlePage;
