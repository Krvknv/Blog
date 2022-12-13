import React, { ReactNode } from 'react';
import { Typography } from 'antd';

import styles from './divider.module.css';

const { Text, Title } = Typography;

const Divider = (props: { children: ReactNode }) => {
  const { children } = props;
  return <div className={styles.divider}>{children}</div>;
};

export default Divider;
