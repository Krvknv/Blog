import React, { useEffect, useState } from 'react';

import { getGlobalArticles, getLocalArticle } from 'API/articlesApi';
import { Tabs, Typography, Pagination, PaginationProps } from 'antd';
import { ColorBox, Card, Tags } from 'components/';
import { useAppDispatch, useAppSelector } from 'features/redux';
import { TArcticle, TArcticleArgs } from 'types/types';

import styles from './main-page.module.css';

const { Text, Title } = Typography;

export const MainPage = () => {
  const [cards, setCards] = useState<TArcticle[]>([]);
  const [articlesQuantity, setArticlesQuantity] = useState<number>(0);
  const [current, setCurrent] = useState<number>(1);
  const [offset, setOffset] = useState<number>(0);
  const [tabsValue, setTabsValue] = useState<string>('global');
  const [showTabs, setShowTabs] = useState<string>('');

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

  const tabsItemAuth = showTabs
    ? [
        {
          label: `Global feed`,
          key: 'global',
          children: cards.map((item: TArcticle) => <Card articleData={item} key={item.slug} />),
        },
        {
          label: `Your feed`,
          key: 'local',
          children:
            cards.length > 0 ? (
              cards.map((item: TArcticle) => <Card articleData={item} key={item.slug} />)
            ) : (
              <p>There are not posts</p>
            ),
        },
        {
          label: `${showTabs}`,
          key: 'tag',
          children: cards.map((item: TArcticle) => <Card articleData={item} key={item.slug} />),
        },
      ]
    : [
        {
          label: `Global feed`,
          key: 'global',
          children: cards.map((item: TArcticle) => <Card articleData={item} key={item.slug} />),
        },
        {
          label: `Your feed`,
          key: 'local',
          children:
            cards.length > 0 ? (
              cards.map((item: TArcticle) => <Card articleData={item} key={item.slug} />)
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
          children: cards.map((item: TArcticle) => <Card articleData={item} key={item.slug} />),
        },
        {
          label: `${showTabs}`,
          key: 'tag',
          children: cards.map((item: TArcticle) => <Card articleData={item} key={item.slug} />),
        },
      ]
    : [
        {
          label: `Global feed`,
          key: 'global',
          children: cards.map((item: TArcticle) => <Card articleData={item} key={item.slug} />),
        },
      ];

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

      setCards(articles);
      setArticlesQuantity(articlesCount);
    };

    request();
  }, [dispatch, offset, showTabs, tabsValue, token]);

  return (
    <>
      <ColorBox>
        <Title style={{ color: '#fff' }}>BLOG</Title>
        <Text style={{ fontSize: '16px', color: '#fff' }}>A place to share your knowledge</Text>
      </ColorBox>

      <div className={styles.cards}>
        <Tags setShowTabs={setShowTabs} />

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
