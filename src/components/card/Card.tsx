import React, { useState } from 'react';
import { TArcticle } from 'types/types';

import styles from './card.module.css';

import { Button, Tag, Typography } from 'antd';

import { NavLink, useNavigate } from 'react-router-dom';
import { modifyDate } from 'features/helpers/modify-date';
import Like from 'components/icons/Like';
import { useAppSelector } from 'features/redux';
import { favoriteArticle, unfavoriteArticle } from 'API/articlesApi';

const { Title, Text } = Typography;

const Card = (props: { articleData: TArcticle }) => {
  const { articleData } = props;

  const [isLiked, setIsLiked] = useState(articleData.favorited);
  const [likeNum, setLikeNum] = useState(articleData.favoritesCount);

  const navigate = useNavigate();

  const { token } = useAppSelector((state) => state.userSlice);

  const handleLike = async () => {
    if (!token) navigate('/sign-up');

    if (isLiked) {
      const { article } = await unfavoriteArticle(articleData.slug, token);

      setIsLiked(article.favorited);
      setLikeNum(article.favoritesCount);
    } else {
      const { article } = await favoriteArticle(articleData.slug, token);
      setIsLiked(article.favorited);
      setLikeNum(article.favoritesCount);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <NavLink to={`/profile/${articleData.author.username}`}>
          <img className={styles.avatar} src={articleData.author.image} alt="" />
        </NavLink>

        <div className={styles.title}>
          <NavLink to={`/profile/${articleData.author.username}`} className={styles.link}>
            <Title style={{ margin: '0' }} level={3}>
              {articleData.author.username}
            </Title>
          </NavLink>

          <span className={styles.subtitle}>{modifyDate(articleData.createdAt)}</span>
        </div>

        <Button
          shape="round"
          icon={<Like color={isLiked ? '#ffffff' : '#ADC5A2'} />}
          size="small"
          className={isLiked ? styles['likeBtn-arctive'] : styles.likeBtn}
          onClick={handleLike}
        >
          {likeNum}
        </Button>
      </div>
      <NavLink
        to={`/article/${articleData.slug}`}
        className={styles.link}
        style={{ marginBottom: '10px' }}
      >
        <Text>{articleData.slug.split('-').join(' ').slice(0, -7)}</Text>
      </NavLink>

      <NavLink
        to={`/article/${articleData.slug}`}
        className={styles.link}
        style={{ marginBottom: '20px' }}
      >
        <Text type="secondary">{articleData.description}</Text>
      </NavLink>

      <div className={styles.footer}>
        <NavLink to={`/article/${articleData.slug}`} className={styles.link}>
          <Text type="secondary">Read more...</Text>
        </NavLink>

        <NavLink to={`/article/${articleData.slug}`} className={styles.link}>
          <div className={styles.tags}>
            {articleData.tagList.map((item, index) => (
              <Tag key={index} color="lime">
                {item}
              </Tag>
            ))}
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Card;
