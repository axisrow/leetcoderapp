import axios from 'axios';
import { API_BASE_URL } from './api';

console.log('[Axios] Creating client with baseURL:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000
});

export default api;
