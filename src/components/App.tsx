import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from './Layout';

import '../styles/global.css';

import { SignPage } from './sign-page/Sign-page';
import Settings from './settings/Settings';
import CreateArticlePage from './create-article-page/Create-article-page';
import ArticlePage from './article-page/Article-page';
import Profile from './profile/Profile';
import MainPage from './main-page/Main-page';

import { store } from 'features/store';
import { Provider } from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="/sign-in" element={<SignPage />} />
          <Route path="/sign-up" element={<SignPage />} />
          <Route path="/new-article" element={<CreateArticlePage />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path={'/article/:id'} element={<ArticlePage />} />
        </Route>
      </Routes>
    </Provider>
  );
};

export default App;
