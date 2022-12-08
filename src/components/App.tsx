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

const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<GlobalPosts />}></Route>
          <Route path="/sign-in" element={<FormPage />}></Route>
          <Route path="/sign-up" element={<FormPage />}></Route>
          <Route path="/new-article" element={<CreateArticlePage />}></Route>
          <Route path="/settings" element={<Settings />}></Route>
          <Route path={'/article/:id'} element={<ArticlePage />} />
        </Route>
      </Routes>
    </Provider>
  );
};

export default App;
