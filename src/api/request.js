import axios from 'axios';
import store from '../store';

export default {
  get $http() {
    return axios.create({
      baseURL: process.env.API_BASE_URL,
      headers: {
        ...(store.getters.authenticated
          ? { Authorization: `Token ${store.getters.authToken}` } : {}),
      },
    });
  },
};
