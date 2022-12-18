import React, { ReactNode } from 'react';

import styles from './color-box.module.css';

type TColorBoxProps = {
  children: ReactNode;
};

export const ColorBox: React.FC<TColorBoxProps> = ({ children }) => {
  return <div className={styles.divider}>{children}</div>;
};
