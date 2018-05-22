import request from './request';

import utils from './utils';


export default {
  profile(nickname) {
    return request.$http.get(
      `/user-profile/${nickname}/`,
    );
  },
  myProfile() {
    return request.$http.get(
      '/my-profile/',
    );
  },
  myRepositories() {
    return new utils.List('/my-repositories/');
  },
};
