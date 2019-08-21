import request from './request';

export default {
  getAll() {
    return request.$http.get('/v2/repository/repository/categories/');
  },
};
