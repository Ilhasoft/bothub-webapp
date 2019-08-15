import qs from 'query-string';

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
      '/v2/account/user-profile/douglas/',
    );
  },
  myRepositories() {
    return new utils.List('/my-repositories/');
  },
  async getMyProfileSchema() {
    const { data } = await request.$http.options('/v2/account/user-profile/');
    return data.actions.PUT;
  },
  updateMyProfile(nickname, email, name, locale) {
    return request.$http.patch(
      '/v2/account/user-profile/',
      {
        nickname,
        email,
        name,
        locale,
      },
    );
  },
  async getChangePasswordSchema() {
    const { data } = await request.$http.options('/change-password/');
    return data.actions.PUT;
  },
  changePassword(currentPassword, password) {
    return request.$http.put(
      '/change-password/',
      {
        current_password: currentPassword,
        password,
      },
    );
  },
  search(query) {
    const queryString = qs.stringify(query);
    return request.$http.get(`/search-user/?${queryString}`);
  },
};
