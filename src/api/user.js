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
  async getMyProfileSchema() {
    const { data } = await request.$http.options('/my-profile/');
    return data.actions.PUT;
  },
  updateMyProfile(nickname, email, name, locale) {
    return request.$http.patch(
      '/my-profile/',
      {
        nickname,
        email,
        name,
        locale,
      },
    );
  },
};
