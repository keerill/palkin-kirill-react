import React from 'react';
import Image from 'next/image';
import { Product } from '@/types/product.types';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product: Product;
  isAuthenticated: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isAuthenticated,
}) => {
  const handleAddToCart = () => {
    alert('Product added to cart!');
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <span className={styles.category}>{product.category}</span>
        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.price}>${product.price.toFixed(2)}</p>
        {isAuthenticated && (
          <button className={styles.addButton} onClick={handleAddToCart}>
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
