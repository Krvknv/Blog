import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { createArticle, editArticle } from 'API/articlesApi';
import { Typography, Button, Form, Input } from 'antd';
import { useAppDispatch, useAppSelector } from 'features/redux';
import { setAticleInfo } from 'features/slices/article-slice';

import styles from './create-article-page.module.css';

const { Title, Text } = Typography;
const { TextArea } = Input;

export const CreateArticlePage = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { token } = useAppSelector((state) => state.userSlice);
  const { name, description, body, tagsList, slug } = useAppSelector((state) => state.articleSlice);

  const [form] = Form.useForm();

  const title = Form.useWatch('title', form);
  const about = Form.useWatch('about', form);
  const text = Form.useWatch('text', form);
  const tags = Form.useWatch('tags', form);

  const [isUniq, setIsUniq] = useState<boolean>(false);
  const [isCreated, setIsCreated] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleCreate = async () => {
    setIsCreated(false);
    setIsUniq(false);

    const tagsArr = tags.split(',');

    const articleData = {
      title: title,
      description: about,
      body: text,
      tagList: tagsArr,
    };

    const response = await createArticle(articleData, token);
    form.resetFields();

    if ('article' in response) {
      setIsCreated(true);
    }

    if (response.errors.title.includes('must be unique')) {
      setIsUniq(true);
    }
  };

  const handleEdit = async () => {
    const tagsArr = tags.split(',');

    const articleData = {
      title: title,
      description: about,
      body: text,
      tagList: tagsArr,
    };

    setIsCreated(false);
    setIsUniq(false);

    const response = await editArticle(slug, articleData, token);

    if (response?.errors?.title.includes('must be unique')) {
      setIsUniq(true);
    }
    if ('article' in response) {
      setIsCreated(true);
      setIsEdit(false);
      dispatch(
        setAticleInfo({
          name: '',
          description: '',
          body: '',
          slug: '',
          tagsList: [],
        })
      );
      navigate(`/article/${response.article.slug}`);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/');

      return;
    }

    const isEditValue = name ? true : false;
    setIsEdit(isEditValue);
  }, [isEdit, name, navigate, token]);

  return (
    <>
      <Title level={2} style={{ marginBottom: '40px' }} className={styles.title}>
        Create new article
      </Title>

      <Form
        initialValues={
          name
            ? { title: name, about: description, text: body, tags: tagsList.join(',') }
            : { title: '', about: '', text: '', tags: '' }
        }
        form={form}
        layout="vertical"
        name="basic"
        autoComplete="off"
        className={styles.form}
      >
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
          style={{ marginBottom: '40px' }}
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

        {isCreated && (
          <Form.Item>
            <Text>The article is published</Text>
          </Form.Item>
        )}

        <Form.Item wrapperCol={{ offset: 8 }}>
          <Button
            type="primary"
            shape="round"
            size="large"
            htmlType="submit"
            style={{ backgroundColor: '#ADC5A2' }}
            onClick={() => (name ? handleEdit() : handleCreate())}
          >
            Publish article
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
