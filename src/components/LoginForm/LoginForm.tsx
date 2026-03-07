'use client';

import React, { SubmitEventHandler, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { validateUsername, validatePassword } from '@/utils/validation';
import Loader from '@/components/Loader/Loader';
import styles from './LoginForm.module.scss';

const LoginForm: React.FC = () => {
  const router = useRouter();
  const { login, isLoading, error } = useAuthStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{
    username: string | null;
    password: string | null;
  }>({
    username: null,
    password: null,
  });

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const usernameError = validateUsername(username);
    const passwordError = validatePassword(password);

    if (usernameError || passwordError) {
      setErrors({
        username: usernameError,
        password: passwordError,
      });
      return;
    }

    setErrors({ username: null, password: null });

    try {
      await login({ username, password });
      router.push('/');
    } catch {
      // Error handled by store
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Login</h2>

      {error && <div className={styles.errorMessage}>{error}</div>}

      <div className={styles.formGroup}>
        <label htmlFor="username" className={styles.label}>
          Username
        </label>
        <input
          type="text"
          id="username"
          className={`${styles.input} ${errors.username ? styles.inputError : ''}`}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isLoading}
        />
        {errors.username && (
          <span className={styles.fieldError}>{errors.username}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input
          type="password"
          id="password"
          className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
        {errors.password && (
          <span className={styles.fieldError}>{errors.password}</span>
        )}
      </div>

      <button
        type="submit"
        className={styles.submitButton}
        disabled={isLoading}
      >
        {isLoading ? <Loader size="small" /> : 'Login'}
      </button>

      <p className={styles.hint}>
        Test credentials: <strong>emilys</strong> / <strong>emilyspass</strong>
      </p>
    </form>
  );
};

export default LoginForm;
