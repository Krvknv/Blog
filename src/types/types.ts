export type TUserData = {
  email: string;
  username: string;
  password: string;
};
export type TFullUserData = {
  email: string;
  username: string;
  password: string;
  bio: string;
  image: string;
  token: string;
};

export type TArticleData = {
  title: string;
  description: string;
  body: string;
  tagList: string[];
};

export type TArcticleArgs = {
  tag?: string;
  author?: string;
  favorited?: string;
  limit?: number;
  offset?: number;
};
export type TArcticle = {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: {
    username: string;
    bio: string | null;
    image: string;
    following: boolean;
  };
};
