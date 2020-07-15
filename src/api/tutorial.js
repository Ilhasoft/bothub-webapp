import qs from 'query-string';
import request from './request';

export default {
  myRepositories(limit, offset) {
    const queryString = qs.stringify(limit, offset);
    return request.$http.get(`/v2/repository/search-repositories/?${queryString}`);
  },
};
