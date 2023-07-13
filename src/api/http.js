import axios from 'axios';
import {API_BASE_URL} from './constant';

const HTTPS = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    timeout: 3000,
  },
});

export default HTTPS;
