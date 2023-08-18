import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost',
});

export default apiClient;