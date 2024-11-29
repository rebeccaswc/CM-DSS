import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API;

const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

export default api;
