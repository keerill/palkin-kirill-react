import api from './api';
import {
  LoginCredentials,
  LoginResponse,
  User,
  RefreshResponse,
} from '@/types/auth.types';

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get<User>('/auth/me');
    return response.data;
  },

  async refreshToken(refreshToken: string): Promise<RefreshResponse> {
    const response = await api.post<RefreshResponse>('/auth/refresh', {
      refreshToken,
    });
    return response.data;
  },
};
