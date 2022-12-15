import React, { useEffect, useState } from 'react';

import ColorBox from 'components/color-box/Color-box';

import { Tabs, Typography } from 'antd';
const { Text, Title } = Typography;

import styles from './main-page.module.css';

import { getGlobalArticles, getGlobalArticlesSignIn, getLocalArticle } from 'API/articlesApi';
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
  const [tabsValue, setTabsValue] = useState('local');

  const onChangePage: PaginationProps['onChange'] = (page) => {
    const offsetNum = (page - 1) * 10;

    setCurrent(page);
    setOffset(offsetNum);
  };

  const dispatch = useAppDispatch();

  // const { pagesQuantity } = useAppSelector((state) => state.articleSlice);
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

      if (token) {
        if (tabsValue === 'local') {
          ({ articles, articlesCount } = await getLocalArticle(token, offset));
        } else {
          ({ articles, articlesCount } = await getGlobalArticlesSignIn(params, token));
        }
      } else {
        ({ articles, articlesCount } = await getGlobalArticles(params));
      }

      const pages = Math.ceil(articlesCount / 10);

      setCardsList(articles);
      setArticlesQuantity(articlesCount);
    };

    request();
  }, [dispatch, offset, tabsValue, token]);

  return (
    <>
      <ColorBox>
        <Title style={{ color: '#fff' }}>BLOG</Title>
        <Text style={{ fontSize: '16px', color: '#fff' }}>A place to share your knowledge</Text>
      </ColorBox>

      <div className={styles.cards}>
        <TagsList />

        {token ? (
          <Tabs
            defaultActiveKey="local"
            style={{ width: '1200px', marginBottom: '50px' }}
            onChange={handleChangeTab}
            items={[
              {
                label: `Global feed`,
                key: 'global',
                children: cardsList.map((item: TArcticle) => (
                  <Card articleData={item} key={item.slug} />
                )),
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
            ]}
          />
        ) : (
          cardsList.map((item: TArcticle) => <Card articleData={item} key={item.slug} />)
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
