import React from 'react';
import styles from './Loader.module.scss';

interface LoaderProps {
  fullscreen?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const Loader: React.FC<LoaderProps> = ({
  fullscreen = false,
  size = 'medium',
}) => {
  const loaderClasses = `${styles.loader} ${styles[size]}`;

  if (fullscreen) {
    return (
      <div className={styles.fullscreen}>
        <div className={loaderClasses}></div>
      </div>
    );
  }

  return <div className={loaderClasses}></div>;
};

export default Loader;
