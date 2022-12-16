import { useAppSelector } from 'features/redux';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

import { Button, Pagination, PaginationProps, Tabs, Typography } from 'antd';

const { Title } = Typography;

import styles from './profile.module.css';
import ColorBox from 'components/color-box/Color-box';
import { TArcticle, TArcticleArgs } from 'types/types';
import { getGlobalArticles } from 'API/articlesApi';
import Card from 'components/card/Card';
import { followUser, getProfile, unfollowUser } from 'API/userApi';

const Profile = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [cardsList, setCardsList] = useState([]);
  const [articlesQuantity, setArticlesQuantity] = useState(0);
  const [current, setCurrent] = useState(1);
  const [offset, setOffset] = useState(0);
  const [tabsValue, setTabsValue] = useState('myArticle');
  const [avatar, setAvatar] = useState('');
  const [isFollowed, setIsFollowed] = useState();
  const [isSend, setIsSend] = useState<string>();

  const { token, username } = useAppSelector((state) => state.userSlice);

  const handleChangeTab = (key: string) => {
    setCurrent(1);
    setTabsValue(key);
    setOffset(0);
  };

  const onChangePage: PaginationProps['onChange'] = (page) => {
    const offsetNum = (page - 1) * 10;

    setCurrent(page);
    setOffset(offsetNum);
  };

  const handleFollow = async () => {
    if (!token) navigate('/sign-up');

    let following;

    if (isFollowed) {
      ({ following } = await unfollowUser(id!, token));
    }

    if (!isFollowed) {
      ({ following } = await followUser(id!, token));
    }

    setIsFollowed(following);
  };

  useEffect(() => {
    const request = async () => {
      const params: TArcticleArgs = {
        tag: '',
        author: '',
        favorited: '',
        limit: 0,
        offset: offset,
      };

      let articles;
      let articlesCount;

      const paramItem = tabsValue === 'myArticle' ? 'author' : 'favorited';

      if (token || id === username) {
        ({ articles, articlesCount } = await getGlobalArticles(
          { ...params, [paramItem]: id! },
          token
        ));
      } else {
        ({ articles, articlesCount } = await getGlobalArticles(
          { ...params, [paramItem]: id! },
          token
        ));
      }

      const { image, following } = await getProfile(id!, token);

      setAvatar(image);
      setCardsList(articles);
      setArticlesQuantity(articlesCount);
      setIsFollowed(following);
    };

    request();
  }, [id, navigate, offset, tabsValue, token, username, isSend]);

  const Cards = cardsList.map((item: TArcticle) => (
    <Card articleData={item} key={item.slug} setIsSend={setIsSend} />
  ));

  return (
    <>
      <ColorBox>
        <img className={styles.avatar} src={avatar} alt="" />
        <Title style={{ color: '#fff' }} level={2}>
          {id}
        </Title>
        {token && id === username ? (
          <NavLink className={styles.link} to="/settings">
            Edit profile
          </NavLink>
        ) : (
          <Button className="button-follow" onClick={handleFollow}>{`${
            isFollowed ? 'Unfollow' : 'Follow'
          } ${id}`}</Button>
        )}
      </ColorBox>

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

      <Pagination
        current={current}
        onChange={onChangePage}
        className="pagination"
        defaultCurrent={1}
        total={articlesQuantity}
        showSizeChanger={false}
      />
    </>
  );
};

export default Profile;
