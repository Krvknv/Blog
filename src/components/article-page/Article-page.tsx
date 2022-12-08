import React from 'react';
import { useParams } from 'react-router-dom';

const ArticlePage = () => {
  const { id } = useParams();

  return <span>{id}</span>;
};

export default ArticlePage;
