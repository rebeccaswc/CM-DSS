import axios from 'axios';
const Backend_apiUrl = process.env.NEXT_PUBLIC_BACKEND_API;

const api = axios.create({
  baseURL: Backend_apiUrl,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default api;
