import React, { ReactNode } from 'react';

import styles from './color-box.module.css';

export const ColorBox = (props: { children: ReactNode }) => {
  const { children } = props;
  return <div className={styles.divider}>{children}</div>;
};
