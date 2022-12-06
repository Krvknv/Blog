import { CREATE_ARTICLE_URL } from 'features/constants';
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
