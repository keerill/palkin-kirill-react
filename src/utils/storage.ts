import Cookies from 'js-cookie';

export const ACCESS_TOKEN_NAME = 'access-token';
const REFRESH_TOKEN_NAME = 'refresh-token';
const ACCESS_TOKEN_EXPIRES = 1 / 48;
const REFRESH_TOKEN_EXPIRES = 30;

export const storage = {
  getAccessToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return Cookies.get(ACCESS_TOKEN_NAME) || null;
  },

  getRefreshToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return Cookies.get(REFRESH_TOKEN_NAME) || null;
  },

  setAccessToken: (token: string): void => {
    if (typeof window === 'undefined') return;
    Cookies.set(ACCESS_TOKEN_NAME, token, {
      expires: ACCESS_TOKEN_EXPIRES,
      path: '/',
      sameSite: 'Lax',
    });
  },

  setRefreshToken: (token: string): void => {
    if (typeof window === 'undefined') return;
    Cookies.set(REFRESH_TOKEN_NAME, token, {
      expires: REFRESH_TOKEN_EXPIRES,
      path: '/',
      sameSite: 'Lax',
    });
  },

  setTokens: (accessToken: string, refreshToken: string): void => {
    if (typeof window === 'undefined') return;
    storage.setAccessToken(accessToken);
    storage.setRefreshToken(refreshToken);
  },

  removeTokens: (): void => {
    if (typeof window === 'undefined') return;
    Cookies.remove(ACCESS_TOKEN_NAME, { path: '/' });
    Cookies.remove(REFRESH_TOKEN_NAME, { path: '/' });
    localStorage.removeItem('auth-storage');
  },

  getToken: (): string | null => {
    return storage.getAccessToken();
  },

  setToken: (token: string): void => {
    storage.setAccessToken(token);
  },

  removeToken: (): void => {
    storage.removeTokens();
  },
};
