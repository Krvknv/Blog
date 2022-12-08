import { CREATE_ARTICLE_URL, GET_GLOBAL_ARTICLE_URL } from 'features/constants';
import { modifyParams } from 'features/helpers/modify-params';
import { TArticleData } from 'types/types';

export const createArticle = async (articleData: TArticleData, token: string) => {
  const response = await fetch(CREATE_ARTICLE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ article: articleData }),
  });

  const responseJson = response.json();

  return responseJson;
};

export const getGlobalArticles = async (params: { [index: string]: string | number }) => {
  const paramsString = modifyParams(params);

  const response = await fetch(`${GET_GLOBAL_ARTICLE_URL}?${paramsString}`);

  const { articles } = await response.json();

  return articles;
};
