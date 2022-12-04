import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';

import '../global.css';
import Divider from './divider/Divider';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Divider />}></Route>
      </Route>
    </Routes>
  );
};

export default App;
