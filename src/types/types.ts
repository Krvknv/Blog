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
