import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

import TextArea from 'antd/es/input/TextArea';

import {
  deleteArticle,
  favoriteArticle,
  getArticle,
  getComments,
  postComment,
  unfavoriteArticle,
} from 'API/articlesApi';
import { followUser, getProfile, unfollowUser } from 'API/userApi';
import { Button, Divider, Form, Tag, Typography } from 'antd';
import { ColorBox, Comment, Like } from 'components/';
import { modifyDate } from 'features/helpers/modify-date';
import { useAppDispatch, useAppSelector } from 'features/redux';
import { setAticleInfo } from 'features/slices/article-slice';
import { TArcticle, TComment } from 'types/types';

import styles from './article-page.module.css';

const { Title, Text } = Typography;

export const ArticlePage = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [form] = Form.useForm();

  const commentText = Form.useWatch('text', form);

  const dispatch = useAppDispatch();

  const { token, image, username } = useAppSelector((state) => state.userSlice);

  const [isFollowed, setIsFollowed] = useState();
  const [isLiked, setIsLiked] = useState();
  const [articleData, setArticleData] = useState<TArcticle>();
  const [commentsList, setCommnetsList] = useState<TComment[]>([]);
  const [likeNum, setLikeNum] = useState();
  const [send, setSend] = useState<string>();

  const date = articleData?.createdAt;

  const handleEdit = async () => {
    const article = await getArticle(id!);

    dispatch(
      setAticleInfo({
        name: article.title,
        description: article.description,
        body: article.body,
        slug: article.slug,
        tagsList: article.tagList,
      })
    );

    navigate('/new-article');
  };

  const handleFollow = async () => {
    if (!token) navigate('/sign-up');

    let following;

    if (isFollowed) {
      ({ following } = await unfollowUser(username, token));
    }

    if (!isFollowed) {
      ({ following } = await followUser(username, token));
    }

    setIsFollowed(following);
  };

  const handleLike = async () => {
    if (!token) navigate('/sign-up');

    if (isLiked) {
      const { article } = await unfavoriteArticle(articleData!.slug, token);

      setIsLiked(article.favorited);
      setLikeNum(article.favoritesCount);
    } else {
      const { article } = await favoriteArticle(articleData!.slug, token);
      setIsLiked(article.favorited);
      setLikeNum(article.favoritesCount);
    }
  };

  const handlePostComment = async () => {
    if (!token) navigate('/sign-up');
    if (commentText) {
      const comment = await postComment(articleData!.slug, token, commentText);
      form.resetFields();
      setSend(JSON.stringify(comment));
    }
  };

  const handleDeleteActicle = async () => {
    await deleteArticle(articleData!.slug, token);
    navigate('/');
  };

  useEffect(() => {
    const request = async () => {
      const article = await getArticle(id!);
      const comments = await getComments(article.slug, token);

      if (token) {
        const { following, favorite } = await getProfile(username, token);

        setIsFollowed(following);
        setIsLiked(favorite);
      }

      setLikeNum(article.favoritesCount);
      setCommnetsList(comments);
      setArticleData(article);
    };

    request();
  }, [id, token, username, send, dispatch]);

  return (
    <>
      <ColorBox>
        <Title style={{ color: '#fff', width: '1200px', marginBottom: '30px' }}>
          {articleData?.title}
        </Title>

        <div className={styles.author}>
          <NavLink to={`/profile/${articleData?.author.username}`}>
            <img className={styles.avatar} src={articleData?.author.image} alt="" />
          </NavLink>

          <div className={styles.title}>
            <NavLink to={`/profile/${articleData?.author.username}`} className={styles.link}>
              <Title style={{ margin: '0', color: '#fff' }} level={3}>
                {articleData?.author.username}
              </Title>
            </NavLink>

            <span className={styles.subtitle}>{modifyDate(date!)}</span>
          </div>

          {articleData?.author.username === username ? (
            <>
              <Button
                danger
                shape="round"
                className={styles['button-delete']}
                onClick={handleDeleteActicle}
              >
                Delete Article
              </Button>
              <Button shape="round" className={styles['button-edit']} onClick={handleEdit}>
                Edit Article
              </Button>
            </>
          ) : (
            <>
              <Button shape="round" className="button-follow" onClick={handleFollow}>{`${
                isFollowed ? 'Unfollow' : 'Follow'
              } ${articleData?.author.username}`}</Button>

              <Button
                shape="round"
                icon={<Like color={isLiked ? '#ffffff' : '#ADC5A2'} />}
                style={{ position: 'static' }}
                className={isLiked ? 'button-like-arctive' : 'button-like'}
                onClick={handleLike}
              >
                {`${isLiked ? 'Favorite' : 'Unfavorite'} article (${likeNum})`}
              </Button>
            </>
          )}
        </div>
      </ColorBox>

      <div className="container">
        <Text className={styles.text}>{articleData?.body}</Text>
        <div className={styles.tags}>
          {articleData?.tagList.map((item, index) => (
            <Tag key={index} color="lime">
              {item}
            </Tag>
          ))}
        </div>
        <Divider />

        <div className={styles['comments-list']}>
          {commentsList.map((item: TComment) => (
            <Comment key={item.id} comment={item} articleDta={articleData!} setSend={setSend} />
          ))}
        </div>

        <Form
          form={form}
          initialValues={{ remember: true }}
          autoComplete="off"
          className={styles.form}
        >
          <Form.Item name="text">
            <TextArea placeholder="Write a comment..." rows={4} />
          </Form.Item>

          <Form.Item>
            <div className={styles['comment-form-footer']}>
              <img
                className={styles.avatar}
                src={image || 'https://api.realworld.io/images/smiley-cyrus.jpeg'}
                alt=""
              />

              <Button shape="round" className={styles['button-post']} onClick={handlePostComment}>
                Post comment
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
