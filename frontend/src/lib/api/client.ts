/**
 * API Client - Axios Instance mit JWT Authentication
 * 
 * Features:
 * - Automatisches JWT-Token Management
 * - Request/Response Interceptors
 * - Error Handling (401 → Logout)
 * - BaseURL aus Environment Variable
 * 
 * @author Hans Hahn - Alle Rechte vorbehalten
 */

import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';

// Base URL aus Environment oder Fallback
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

/**
 * Axios Instance mit Basis-Konfiguration
 */
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 Sekunden
});

/**
 * Request Interceptor - JWT Token + Org-ID automatisch hinzufügen
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('auth_token');
    const orgId = localStorage.getItem('current_org_id'); // ⭐ Org-ID aus localStorage
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // ⭐ X-Org-Id Header setzen (für Multi-Tenancy)
    if (orgId && config.headers) {
      config.headers['X-Org-Id'] = orgId;
    }
    
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor - Error Handling
 */
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // 401 Unauthorized → Token abgelaufen, Logout
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      
      // Redirect zu Login (nur wenn nicht schon auf Login-Seite)
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    
    // 403 Forbidden → Keine Berechtigung
    if (error.response?.status === 403) {
      console.error('Keine Berechtigung für diese Aktion');
    }
    
    // 500 Server Error
    if (error.response?.status === 500) {
      console.error('Server-Fehler:', error.response.data);
    }
    
    return Promise.reject(error);
  }
);

/**
 * Helper: Token im localStorage speichern
 */
export const setAuthToken = (token: string) => {
  localStorage.setItem('auth_token', token);
};

/**
 * Helper: Token aus localStorage entfernen
 */
export const removeAuthToken = () => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user');
};

/**
 * Helper: Prüfen ob User eingeloggt ist
 */
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('auth_token');
};

export default apiClient;
