import axios from 'axios';

const API_PREFIX = 'api';
const PUBLIC_API = process.env.REACT_APP_LB_URL;

const BASE_URL = `${PUBLIC_API}/${API_PREFIX}`;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
