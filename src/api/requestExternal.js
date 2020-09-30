import axios from 'axios';
import store from '../store';

export default {
  $http(token) {
    return axios.create({
      baseURL: process.env.API_BASE_URL,
      headers: {
        ...(token
          ? { Authorization: `Token ${token}` } : {}),
      },
    });
  },
};
