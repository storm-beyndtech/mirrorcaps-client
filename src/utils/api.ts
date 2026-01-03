/**
 * Centralized API utility that auto-injects auth headers.
 * IMPORTANT: Auth token key must match AuthContext.
 * This project stores the JWT under `authToken` in localStorage.
 */

const getAuthToken = (): string | null => {
  const token = localStorage.getItem('authToken');
  return token || null;
};

interface FetchOptions extends RequestInit {
  requiresAuth?: boolean;
}

export const apiFetch = async (url: string, options: FetchOptions = {}) => {
  const { requiresAuth = true, headers = {}, ...rest } = options;
  const finalHeaders = new Headers(headers);

  if (requiresAuth) {
    const token = getAuthToken();
    if (token && !finalHeaders.has('Authorization')) {
      finalHeaders.set('Authorization', `Bearer ${token}`);
    }
  }

  return fetch(url, { ...rest, headers: finalHeaders });
};

export const apiGet = (url: string, requiresAuth = true) =>
  apiFetch(url, { method: 'GET', requiresAuth });

export const apiPost = (url: string, data?: any, requiresAuth = true) => {
  const isFormData = data instanceof FormData;
  const headers: HeadersInit = isFormData ? {} : { 'Content-Type': 'application/json' };
  return apiFetch(url, {
    method: 'POST',
    headers,
    body: isFormData ? data : data ? JSON.stringify(data) : undefined,
    requiresAuth,
  });
};

export const apiPut = (url: string, data?: any, requiresAuth = true) => {
  const isFormData = data instanceof FormData;
  const headers: HeadersInit = isFormData ? {} : { 'Content-Type': 'application/json' };
  return apiFetch(url, {
    method: 'PUT',
    headers,
    body: isFormData ? data : data ? JSON.stringify(data) : undefined,
    requiresAuth,
  });
};

export const apiDelete = (url: string, requiresAuth = true) =>
  apiFetch(url, { method: 'DELETE', requiresAuth });
