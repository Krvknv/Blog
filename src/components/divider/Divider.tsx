import React from 'react';
import { Typography } from 'antd';

import styles from './divider.module.css';

const { Text, Title } = Typography;

const Divider = () => {
  return (
    <div className={styles.divider}>
      <Title style={{ color: '#fff' }}>BLOG</Title>
      <Text className={styles.subtitle}>A place to share your knowledge</Text>
    </div>
  );
};

export default Divider;
