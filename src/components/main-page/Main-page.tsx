import React, { useEffect, useState } from 'react';

import ColorBox from 'components/color-box/Color-box';

import { Tabs, Typography } from 'antd';
const { Text, Title } = Typography;

import styles from './main-page.module.css';

import { getGlobalArticles, getLocalArticle } from 'API/articlesApi';
import { TArcticle, TArcticleArgs } from 'types/types';
import Card from 'components/card/Card';
import TagsList from 'components/tags-list/Tags-list';
import { useAppDispatch, useAppSelector } from 'features/redux';
import { Pagination, PaginationProps } from 'antd';

const MainPage = () => {
  const [cardsList, setCardsList] = useState([]);
  const [articlesQuantity, setArticlesQuantity] = useState(0);
  const [current, setCurrent] = useState(1);
  const [offset, setOffset] = useState(0);
  const [tabsValue, setTabsValue] = useState('global');
  const [showTabs, setShowTabs] = useState('');

  const onChangePage: PaginationProps['onChange'] = (page) => {
    const offsetNum = (page - 1) * 10;

    setCurrent(page);
    setOffset(offsetNum);
  };

  const dispatch = useAppDispatch();

  const { token } = useAppSelector((state) => state.userSlice);

  const handleChangeTab = (key: string) => {
    setCurrent(1);
    setTabsValue(key);
    setOffset(0);
  };

  useEffect(() => {
    const request = async () => {
      const params: TArcticleArgs = {
        tag: '',
        author: '',
        favorited: '',
        limit: 10,
        offset: offset,
      };

      let articles;
      let articlesCount;

      if (tabsValue === 'local') {
        ({ articles, articlesCount } = await getLocalArticle(token, offset));
      } else if (tabsValue === 'tag') {
        ({ articles, articlesCount } = await getGlobalArticles(
          { ...params, tag: showTabs },
          token
        ));
      } else {
        ({ articles, articlesCount } = await getGlobalArticles(params, token));
      }

      setCardsList(articles);
      setArticlesQuantity(articlesCount);
    };

    request();
  }, [dispatch, offset, showTabs, tabsValue, token]);

  const tabsItemAuth = showTabs
    ? [
        {
          label: `Global feed`,
          key: 'global',
          children: cardsList.map((item: TArcticle) => <Card articleData={item} key={item.slug} />),
        },
        {
          label: `Your feed`,
          key: 'local',
          children:
            cardsList.length > 0 ? (
              cardsList.map((item: TArcticle) => <Card articleData={item} key={item.slug} />)
            ) : (
              <p>There are not posts</p>
            ),
        },
        {
          label: `${showTabs}`,
          key: 'tag',
          children: cardsList.map((item: TArcticle) => <Card articleData={item} key={item.slug} />),
        },
      ]
    : [
        {
          label: `Global feed`,
          key: 'global',
          children: cardsList.map((item: TArcticle) => <Card articleData={item} key={item.slug} />),
        },
        {
          label: `Your feed`,
          key: 'local',
          children:
            cardsList.length > 0 ? (
              cardsList.map((item: TArcticle) => <Card articleData={item} key={item.slug} />)
            ) : (
              <p>There are not posts</p>
            ),
        },
      ];

  const tabsItem = showTabs
    ? [
        {
          label: `Global feed`,
          key: 'global',
          children: cardsList.map((item: TArcticle) => <Card articleData={item} key={item.slug} />),
        },
        {
          label: `${showTabs}`,
          key: 'tag',
          children: cardsList.map((item: TArcticle) => <Card articleData={item} key={item.slug} />),
        },
      ]
    : [
        {
          label: `Global feed`,
          key: 'global',
          children: cardsList.map((item: TArcticle) => <Card articleData={item} key={item.slug} />),
        },
      ];

  return (
    <>
      <ColorBox>
        <Title style={{ color: '#fff' }}>BLOG</Title>
        <Text style={{ fontSize: '16px', color: '#fff' }}>A place to share your knowledge</Text>
      </ColorBox>

      <div className={styles.cards}>
        <TagsList setShowTabs={setShowTabs} />

        {token ? (
          <Tabs
            defaultActiveKey="global"
            style={{ width: '1200px', marginBottom: '50px' }}
            onChange={handleChangeTab}
            items={tabsItemAuth}
          />
        ) : (
          <Tabs
            defaultActiveKey="global"
            style={{ width: '1200px', marginBottom: '50px' }}
            onChange={handleChangeTab}
            items={tabsItem}
          />
        )}
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

export default MainPage;
