import React, { ReactNode } from 'react';
import { Typography } from 'antd';

import styles from './color-box.module.css';

const { Text, Title } = Typography;

const ColorBox = (props: { children: ReactNode }) => {
  const { children } = props;
  return <div className={styles.divider}>{children}</div>;
};

export default ColorBox;
