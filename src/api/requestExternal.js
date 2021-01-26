import axios from 'axios';

export default {
  $http(token) {
    return axios.create({
      baseURL: process.env.VUE_APP_API_BASE_URL,
      headers: {
        ...(token
          ? { Authorization: `Translator ${token}` } : {}),
      },
    });
  },
};
