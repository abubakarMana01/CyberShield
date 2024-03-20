import axios from 'axios';

export const axiosInstance = axios.create({
  // baseURL: 'http://localhost:8080/api',
  baseURL: 'https://cyber-shield-server.onrender.com/api',
});
