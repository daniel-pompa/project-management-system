import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Intercept outgoing requests to add the Authorization header if a token exists
api.interceptors.request.use(config => {
  const token = localStorage.getItem('AUTH_TOKEN');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
