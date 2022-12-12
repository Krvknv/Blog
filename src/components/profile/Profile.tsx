import { useAppSelector } from 'features/redux';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { Tabs, Typography } from 'antd';

const { Title } = Typography;

import styles from './profile.module.css';
import Divider from 'components/divider/Divider';
import { TArcticle, TArcticleArgs } from 'types/types';
import { getGlobalArticlesSignIn } from 'API/articlesApi';
import Card from 'components/card/Card';

const Profile = () => {
  const navigate = useNavigate();

  const [cardsList, setCardsList] = useState([]);

  const [tabsValue, setTabsValue] = useState('myArticle');

  const { token, username, image } = useAppSelector((state) => state.userSlice);

  const handleChangeTab = (key: string) => {
    setTabsValue(key);
  };

  useEffect(() => {
    if (!token) navigate('/');

    const request = async () => {
      const params: TArcticleArgs = {
        tag: '',
        author: '',
        favorited: '',
        limit: 10,
        offset: 0,
      };

      let articles;

      const response = await getGlobalArticlesSignIn(params, token);

      if (tabsValue === 'myArticle') {
        articles = response.articles.filter((item: TArcticle) => item.author.username === username);
      }
      if (tabsValue === 'favorite') {
        articles = response.articles.filter((item: TArcticle) => item.favorited === true);
      }

      setCardsList(articles);
    };

    request();
  }, [navigate, tabsValue, token, username]);

  const Cards = cardsList.map((item: TArcticle) => <Card article={item} key={item.slug} />);

  return (
    <>
      <Divider>
        <img className={styles.avatar} src={image} alt="" />
        <Title style={{ color: '#fff' }} level={2}>
          {username}
        </Title>
        <NavLink className={styles.link} to="/settings">
          Edit profile
        </NavLink>
      </Divider>

      <div className="container">
        <Tabs
          defaultActiveKey="myArticle"
          onChange={handleChangeTab}
          items={[
            {
              label: `My articles`,
              key: 'myArticle',
              children: cardsList.length > 0 ? Cards : <p>There are not posts</p>,
            },
            {
              label: `Favorited articles`,
              key: 'favorite',
              children: cardsList.length > 0 ? Cards : <p>There are not posts</p>,
            },
          ]}
        />
      </div>
    </>
  );
};

export default Profile;
