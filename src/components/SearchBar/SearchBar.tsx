'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useProductsStore } from '@/store/productsStore';
import { debounce } from '@/utils/debounce';
import styles from './SearchBar.module.scss';

const SearchBar: React.FC = () => {
  const { searchQuery, searchProducts, fetchProducts } = useProductsStore();
  const [inputValue, setInputValue] = useState(searchQuery);

  const debouncedSearchRef = useRef(
    debounce((query: string) => {
      searchProducts(query);
    }, 500),
  );

  useEffect(() => {
    debouncedSearchRef.current = debounce((query: string) => {
      searchProducts(query);
    }, 300);
  }, [searchProducts]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSearchRef.current(value);
  };

  const handleClear = () => {
    setInputValue('');
    fetchProducts();
  };

  return (
    <div className={styles.searchBar}>
      <div className={styles.searchWrapper}>
        <svg
          className={styles.searchIcon}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search products..."
          value={inputValue}
          onChange={handleInputChange}
          aria-label="Search products"
        />

        {inputValue && (
          <button
            className={styles.clearButton}
            onClick={handleClear}
            aria-label="Clear search"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4L4 12M4 4l8 8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
