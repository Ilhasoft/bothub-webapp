import axios from 'axios';

export default {
  $http(token) {
    return axios.create({
      baseURL: process.env.API_BASE_URL,
      headers: {
        ...(token
          ? { Authorization: `Translator ${token}` } : {}),
      },
    });
  },
};
