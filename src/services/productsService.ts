import api from './api';
import { ProductsResponse } from '@/types/product.types';

export const productsService = {
  async getProducts(
    limit: number = 12,
    skip: number = 0,
  ): Promise<ProductsResponse> {
    const response = await api.get<ProductsResponse>(
      `/products?limit=${limit}&skip=${skip}`,
    );
    return response.data;
  },

  async searchProducts(
    query: string,
    limit: number = 12,
    skip: number = 0,
  ): Promise<ProductsResponse> {
    const response = await api.get<ProductsResponse>(
      `/products/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`,
    );
    return response.data;
  },
};
