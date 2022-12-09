import React, { useEffect, useState } from 'react';

import Divider from 'components/divider/Divider';

import styles from './posts.module.css';
// import '../../global.css';

import { getGlobalArticles } from 'API/articlesApi';
import { TArcticleArgs } from 'types/types';
import Card from 'components/card/Card';
import TagsList from 'components/tags-list/Tags-list';
import { useAppDispatch, useAppSelector } from 'features/redux';
import { setPagesQuantity } from 'features/slices/article-slice';
import { Pagination, PaginationProps } from 'antd';

const GlobalPosts = () => {
  const [cardsList, setCardsList] = useState([]);
  const [articlesQuantity, setArticlesQuantity] = useState(0);
  const [current, setCurrent] = useState(1);
  const [offset, setOffset] = useState(0);

  const onChangePage: PaginationProps['onChange'] = (page) => {
    const offsetNum = (page - 1) * 10;

    setCurrent(page);
    setOffset(offsetNum);
  };

  const dispatch = useAppDispatch();

  const { pagesQuantity } = useAppSelector((state) => state.articleSlice);

  useEffect(() => {
    const request = async () => {
      const params: TArcticleArgs = {
        tag: '',
        author: '',
        favorited: '',
        limit: 10,
        offset: offset,
      };
      const { articles, articlesCount } = await getGlobalArticles(params);

      const pages = Math.ceil(articlesCount / 10);

      dispatch(setPagesQuantity({ pagesQuantity: pages }));
      setCardsList(articles);
      setArticlesQuantity(articlesCount);
    };

    request();
  }, [dispatch, offset]);

  return (
    <>
      <Divider />
      <div className={styles.cards}>
        <TagsList />

        {cardsList.map((item, index) => (
          <Card article={item} key={index} />
        ))}
      </div>

      <Pagination
        current={current}
        onChange={onChangePage}
        className={styles.pagination}
        defaultCurrent={1}
        total={articlesQuantity}
        showSizeChanger={false}
      />
    </>
  );
};

export default GlobalPosts;
