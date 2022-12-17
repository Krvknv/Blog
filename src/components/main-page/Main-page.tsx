import React, { useEffect, useState, useCallback } from 'react';

import { ColorBox, Card } from 'components/';

import TagsList from 'components/tags-list/Tags-list';

import { Tabs, Typography } from 'antd';
const { Text, Title } = Typography;

import styles from './main-page.module.css';

import { getGlobalArticles, getLocalArticle } from 'API/articlesApi';
import { TArcticle, TArcticleArgs } from 'types/types';
import { useAppDispatch, useAppSelector } from 'features/redux';
import { Pagination, PaginationProps } from 'antd';

type TTabKeys = {
  LOCAL: 'local';
  GLOBAL: 'global';
  TAG: 'tag';
};

const tabKeys: TTabKeys = {
  LOCAL: 'local',
  GLOBAL: 'global',
  TAG: 'tag',
};

const MainPage = () => {
  console.log('render');

  const [cards, setCards] = useState([]);

  const [articlesQuantity, setArticlesQuantity] = useState(0);
  const [current, setCurrent] = useState(1);
  const [offset, setOffset] = useState(0);
  const [tabsValue, setTabsValue] = useState('global');
  const [showTabs, setShowTabs] = useState('');

  const { token } = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();

  const onChangePage: PaginationProps['onChange'] = useCallback((page: number) => {
    const offsetNum = (page - 1) * 10;
    // skip?
    setCurrent(page);
    setOffset(offsetNum);
  }, []);

  // useCallback
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

      let response;
      if (tabsValue === 'local') {
        response = await getLocalArticle(token, offset);
      }

      if (tabsValue === 'tag') {
        response = await getGlobalArticles({ ...params, tag: showTabs }, token);
      }

      if (tabsValue === 'global') {
        response = await getGlobalArticles(params, token);
      }

      setCards(response.articles);
      setArticlesQuantity(response.articlesCount);
    };

    request();
  }, [dispatch, offset, showTabs, tabsValue, token]);

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
