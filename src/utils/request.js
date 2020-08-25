import axios from 'axios';
axios.defaults.withCredentials= true;  
const request = axios.create({
  baseURL: 'http://localhost:2003/api',
  headers: {
    'Content-Type': 'application/json',
  }
});

export default request;