import React from 'react';
import { TArcticle } from 'types/types';

import styles from './card.module.css';

import { Button, Tag, Typography } from 'antd';

import { NavLink } from 'react-router-dom';
import { modifyDate } from 'features/helpers/modify-date';
import Like from 'components/icons/Like';

const { Title, Text } = Typography;

const Card = (props: { article: TArcticle }) => {
  const { article } = props;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <NavLink to={`/article/${article.slug}`}>
          <img className={styles.avatar} src={article.author.image} alt="" />
        </NavLink>

        <div className={styles.title}>
          <NavLink to={`/article/${article.slug}`} className={styles.link}>
            <Title style={{ margin: '0' }} level={3}>
              {article.author.username}
            </Title>
          </NavLink>

          <span className={styles.subtitle}>{modifyDate(article.createdAt)}</span>
        </div>

        <Button shape="round" icon={<Like />} size="small" className={styles.likeBtn}>
          {article.favoritesCount}
        </Button>
      </div>
      <NavLink
        to={`/article/${article.slug}`}
        className={styles.link}
        style={{ marginBottom: '10px' }}
      >
        <Text>{article.slug.split('-').join(' ').slice(0, -7)}</Text>
      </NavLink>

      <NavLink
        to={`/article/${article.slug}`}
        className={styles.link}
        style={{ marginBottom: '20px' }}
      >
        <Text type="secondary">{article.description}</Text>
      </NavLink>

      <div className={styles.footer}>
        <NavLink to={`/article/${article.slug}`} className={styles.link}>
          <Text type="secondary">Read more...</Text>
        </NavLink>

        <NavLink to={`/article/${article.slug}`} className={styles.link}>
          <div className={styles.tags}>
            {article.tagList.map((item, index) => (
              <Tag key={index} color="lime">
                magenta
              </Tag>
            ))}
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Card;
