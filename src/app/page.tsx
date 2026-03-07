'use client';

import { useEffect, useRef } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useProductsStore } from '@/store/productsStore';
import ProductCard from '@/components/ProductCard/ProductCard';
import SearchBar from '@/components/SearchBar/SearchBar';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import styles from './page.module.scss';

export default function Home() {
  const { isAuthenticated } = useAuthStore();
  const {
    products,
    isLoading,
    isLoadingMore,
    error,
    searchQuery,
    hasMore,
    total,
    fetchProducts,
    loadMore,
  } = useProductsStore();

  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    const target = observerTarget.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          console.log('Intersection detected, loading more...', {
            hasMore,
            isLoadingMore,
            currentProducts: products.length,
            total,
          });
          loadMore();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '200px',
      },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, isLoadingMore, loadMore, products.length, total]);

  if (isLoading && products.length === 0) {
    return <Loader fullscreen />;
  }

  if (error && products.length === 0) {
    return (
      <div className={styles.errorContainer}>
        <ErrorMessage message={error} onRetry={fetchProducts} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Latest Products</h1>

      <SearchBar />

      {isLoading && products.length === 0 && (
        <div className={styles.searchLoader}>
          <Loader size="medium" />
        </div>
      )}

      {!isLoading && searchQuery && products.length > 0 && (
        <p className={styles.searchResults}>
          Showing {products.length} of {total} founded products
          {products.length !== 1 ? 's' : ''} for &quot;{searchQuery}&quot;
        </p>
      )}

      {!isLoading && !searchQuery && products.length > 0 && (
        <p className={styles.searchResults}>
          Showing {products.length} of {total} products
          {hasMore && ' • Scroll down for more'}
        </p>
      )}

      {products.length > 0 ? (
        <>
          <div className={styles.productsGrid}>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isAuthenticated={isAuthenticated}
              />
            ))}
          </div>

          {hasMore && !isLoadingMore && (
            <div className={styles.manualLoadMore}>
              <button onClick={loadMore} className={styles.loadMoreButton}>
                Load More Products
              </button>
            </div>
          )}

          <div ref={observerTarget} className={styles.loadMoreTrigger}>
            {isLoadingMore && (
              <div className={styles.loadMoreLoader}>
                <Loader size="medium" />
                <p className={styles.loadingText}>Loading more products...</p>
              </div>
            )}
          </div>

          {!hasMore && products.length > 12 && (
            <div className={styles.endMessage}>
              <p>You&apos;ve reached the end of the list</p>
            </div>
          )}
        </>
      ) : (
        !isLoading &&
        !error && (
          <div className={styles.emptyState}>
            <p>No products found. Try a different search term.</p>
          </div>
        )
      )}
    </div>
  );
}
