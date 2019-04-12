import axios from 'axios';
import { globalConst } from './tools.js';

const Axios = axios.create({
  baseURL: globalConst.SERVER_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
    'Content-Type': 'application/json; charset=utf-8'
  }
});

Axios.interceptors.response.use(
  res => { return res.data; },
  error => { return Promise.reject(error); }
);

export default Axios;
