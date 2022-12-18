import React from 'react';

import styles from './footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.author}>
        <a href="https://github.com/Krvknv" className={styles.link}>
          <img className={styles.img} src="/assets/img/footer-logo.jpg" alt="" />
        </a>
        <a href="https://github.com/Krvknv" className={styles.link}>
          <span>krvknv</span>
        </a>
        <span>2022</span>
      </div>
    </footer>
  );
};
