import React, { useEffect, useState } from 'react';

import Divider from 'components/divider/Divider';

import styles from './posts.module.css';
import { getGlobalArticles } from 'API/articlesApi';
import { TArcticleArgs } from 'types/types';
import Card from 'components/card/Card';

const GlobalPosts = () => {
  const [cardsList, setCardsList] = useState([]);

  useEffect(() => {
    const request = async () => {
      const params: TArcticleArgs = {
        tag: '',
        author: '',
        favorited: '',
        limit: 10,
        offset: 0,
      };
      const response = await getGlobalArticles(params);
      setCardsList(response);
    };

    request();
  }, []);

  return (
    <>
      <Divider />
      <div className={styles.cards}>
        {cardsList.map((item, index) => (
          <Card article={item} key={index} />
        ))}
      </div>
    </>
  );
};

export default GlobalPosts;
