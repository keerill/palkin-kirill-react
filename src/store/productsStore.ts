import { create } from 'zustand';
import { Product } from '@/types/product.types';
import { productsService } from '@/services/productsService';

interface ProductsStore {
  products: Product[];
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
  searchQuery: string;
  skip: number;
  total: number;
  hasMore: boolean;
  fetchProducts: () => Promise<void>;
  searchProducts: (query: string) => Promise<void>;
  loadMore: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  clearProducts: () => void;
  clearError: () => void;
}

export const useProductsStore = create<ProductsStore>((set, get) => ({
  products: [],
  isLoading: false,
  isLoadingMore: false,
  error: null,
  searchQuery: '',
  skip: 0,
  total: 0,
  hasMore: true,

  fetchProducts: async () => {
    set({ isLoading: true, error: null, skip: 0, searchQuery: '' });
    try {
      const response = await productsService.getProducts(12, 0);
      set({
        products: response.products,
        total: response.total,
        skip: response.products.length,
        hasMore: response.products.length < response.total,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage =
        (error as { message?: string }).message ||
        'Failed to fetch products. Please try again.';
      set({
        products: [],
        isLoading: false,
        error: errorMessage,
      });
    }
  },

  searchProducts: async (query: string) => {
    set({ isLoading: true, error: null, searchQuery: query, skip: 0 });

    if (!query.trim()) {
      await get().fetchProducts();
      return;
    }

    try {
      const response = await productsService.searchProducts(query, 12, 0);
      set({
        products: response.products,
        total: response.total,
        skip: response.products.length,
        hasMore: response.products.length < response.total,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage =
        (error as { message?: string }).message ||
        'Failed to search products. Please try again.';
      set({
        products: [],
        isLoading: false,
        error: errorMessage,
      });
    }
  },

  loadMore: async () => {
    const state = get();
    if (state.isLoadingMore || !state.hasMore) return;

    set({ isLoadingMore: true, error: null });

    try {
      const response = state.searchQuery
        ? await productsService.searchProducts(
            state.searchQuery,
            12,
            state.skip,
          )
        : await productsService.getProducts(12, state.skip);

      const newProducts = [...state.products, ...response.products];
      set({
        products: newProducts,
        skip: newProducts.length,
        hasMore: newProducts.length < response.total,
        isLoadingMore: false,
        error: null,
      });
    } catch (error) {
      const errorMessage =
        (error as { message?: string }).message ||
        'Failed to load more products.';
      set({
        isLoadingMore: false,
        error: errorMessage,
      });
    }
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },

  clearProducts: () => {
    set({
      products: [],
      error: null,
      searchQuery: '',
      skip: 0,
      total: 0,
      hasMore: true,
    });
  },

  clearError: () => {
    set({ error: null });
  },
}));
