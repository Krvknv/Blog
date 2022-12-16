import { ARTICLES_URL, GET_TAGS_URL, GET_YOUR_FEED_URL } from 'features/constants';
import { modifyParams } from 'features/helpers/modify-params';
import { TArticleData } from 'types/types';

export const createArticle = async (articleData: TArticleData, token: string) => {
  const response = await fetch(ARTICLES_URL, {
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

export const getGlobalArticles = async (
  params: { [index: string]: string | number },
  token: string
) => {
  const options = token
    ? {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Bearer ${token}`,
        },
      }
    : {};
  const paramsString = modifyParams(params);
  const response = await fetch(`${ARTICLES_URL}?${paramsString}`, options);

  const responseJson = await response.json();

  return responseJson;
};

export const getTags = async () => {
  const response = await fetch(GET_TAGS_URL);

  const { tags } = await response.json();

  return tags;
};

export const favoriteArticle = async (slug: string, token: string) => {
  const response = await fetch(`${ARTICLES_URL}/${slug}/favorite`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${token}`,
    },
  });

  const responseJson = response.json();

  return responseJson;
};

export const unfavoriteArticle = async (slug: string, token: string) => {
  const response = await fetch(`${ARTICLES_URL}/${slug}/favorite`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${token}`,
    },
  });

  const responseJson = response.json();

  return responseJson;
};

export const getLocalArticle = async (token: string, offset: number) => {
  const response = await fetch(`${GET_YOUR_FEED_URL}?limit=20&offset=${offset}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${token}`,
    },
  });

  const responseJson = response.json();

  return responseJson;
};

export const getArticle = async (slug: string) => {
  const response = await fetch(`${ARTICLES_URL}/${slug}`);
  const { article } = await response.json();

  return article;
};

export const getComments = async (slug: string, token: string) => {
  const options = token
    ? {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Bearer ${token}`,
        },
      }
    : {};
  const response = await fetch(`${ARTICLES_URL}/${slug}/comments`, options);
  const { comments } = await response.json();

  return comments;
};

export const postComment = async (slug: string, token: string, commentText: string) => {
  const response = await fetch(`${ARTICLES_URL}/${slug}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      comment: {
        body: commentText,
      },
    }),
  });
  const { comment } = await response.json();

  return comment;
};

export const deleteComment = async (slug: string, id: number, token: string) => {
  const response = await fetch(`${ARTICLES_URL}/${slug}/comments/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${token}`,
    },
  });
  const { comment } = await response.json();

  return comment;
};

export const deleteArticle = async (slug: string, token: string) => {
  await fetch(`${ARTICLES_URL}/${slug}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const editArticle = async (slug: string, articleData: TArticleData, token: string) => {
  const response = await fetch(`${ARTICLES_URL}/${slug}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ article: articleData }),
  });

  const responseJson = await response.json();

  return responseJson;
};
