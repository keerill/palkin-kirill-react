'use client';

import React from 'react';
import { useAuthStore } from '@/store/authStore';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  const { user, isAuthenticated } = useAuthStore();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.text}>
          {currentYear}
          {isAuthenticated && user && (
            <>
              {' '}
              | Logged as <span className={styles.email}>{user.email}</span>
            </>
          )}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
