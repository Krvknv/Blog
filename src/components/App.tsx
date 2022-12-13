import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';

import '../global.css';
import FormPage from './sign-page/Sign-page';
import { store } from 'features/store';
import { Provider } from 'react-redux';
import Settings from './settings/Settings';
import GlobalPosts from './global-posts/Global-posts';
import CreateArticlePage from './create-article-page/Create-article-page';
import ArticlePage from './article-page/Article-page';
import Profile from './profile/Profile';

const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<GlobalPosts />} />
          <Route path="/sign-in" element={<FormPage />} />
          <Route path="/sign-up" element={<FormPage />} />
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
