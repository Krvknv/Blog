import React from 'react';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import {
  Layout,
  ArticlePage,
  CreateArticlePage,
  MainPage,
  Profile,
  Settings,
  SignPage,
} from 'components/';
import { store } from 'features/store';

import '../styles/global.css';

export const App = () => {
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
