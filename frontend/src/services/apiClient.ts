import axios from 'axios';

// Die Backend-URL wird aus den Umgebungsvariablen geladen
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Interceptor hinzufügen, um den JWT-Token bei jeder Anfrage mitzusenden
apiClient.interceptors.request.use(
  (config) => {
    // Hier würde die Logik stehen, um den Token aus dem State (z.B. Redux) zu holen
    const token = localStorage.getItem('authToken'); // Beispiel: Token aus dem LocalStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
