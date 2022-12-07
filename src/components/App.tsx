import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';

import '../global.css';
import Divider from './divider/Divider';
import FormPage from './sign-page/Sign-page';
import { store } from 'features/store';
import { Provider } from 'react-redux';
import ArticlePage from './article-page/Article-page';
import Settings from './settings/Settings';

const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Divider />}></Route>
          <Route path="/sign-in" element={<FormPage />}></Route>
          <Route path="/sign-up" element={<FormPage />}></Route>
          <Route path="/new-article" element={<ArticlePage />}></Route>
          <Route path="/settings" element={<Settings />}></Route>
        </Route>
      </Routes>
    </Provider>
  );
};

export default App;
