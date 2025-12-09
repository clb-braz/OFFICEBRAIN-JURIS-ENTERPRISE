export const AUTH_TOKEN_KEY = 'token';
export const AUTH_USER_KEY = 'user';

export function setAuth(token: string, user?: any) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  // Grava cookie para middleware e chamadas SSR
  const maxAge = 24 * 60 * 60; // 24h
  document.cookie = `${AUTH_TOKEN_KEY}=${token}; path=/; max-age=${maxAge}; SameSite=Lax`;
  if (user) {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  }
}

export function clearAuth() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
  document.cookie = `${AUTH_TOKEN_KEY}=; path=/; max-age=0; SameSite=Lax`;
}

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function getUser(): any | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(AUTH_USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

