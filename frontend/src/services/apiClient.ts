import axios from 'axios';

// Die Backend-URL wird aus den Umgebungsvariablen geladen
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor hinzufügen, um den JWT-Token und Org-ID bei jeder Anfrage mitzusenden
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    const orgId = localStorage.getItem('current_org_id');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (orgId) {
      config.headers['X-Org-Id'] = orgId;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
