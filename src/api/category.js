import request from './request';

export default {
  getAll() {
    return request.$http.get('/categories/');
  },
};
