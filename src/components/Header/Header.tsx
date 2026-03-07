'use client';

import React from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoText}>Abelohost</span>
          <span className={styles.logoAccent}> Shop</span>
        </Link>

        <nav className={styles.nav}>
          {isAuthenticated && user ? (
            <div className={styles.authInfo}>
              <span className={styles.userName}>
                {user.firstName} {user.lastName}
              </span>
              <button onClick={handleLogout} className={styles.logoutButton}>
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" className={styles.loginLink}>
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
