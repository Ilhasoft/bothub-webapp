import qs from 'query-string';

import request from './request';
import utils from './utils';


export default {
  profile(nickname) {
    return request.$http.get(
      `v2/account/user-profile/${nickname}/`,
    );
  },
  myProfile() {
    return request.$http.get(
      '/v2/account/my-profile/',
    );
  },
  myRepositories() {
    return new utils.List('/v2/repository/search-repositories/');
  },
  async getMyProfileSchema() {
    const { data } = await request.$http.options('/v2/account/my-profile/');
    return data.actions.PUT;
  },
  updateMyProfile(nickname, email, name, locale) {
    return request.$http.put(
      '/v2/account/my-profile/',
      {
        nickname,
        email,
        name,
        locale,
      },
    );
  },
  async getChangePasswordSchema() {
    const { data } = await request.$http.options('/v2/account/change-password/');
    return data.actions.PUT;
  },
  changePassword(currentPassword, password) {
    return request.$http.put(
      '/v2/account/change-password/',
      {
        current_password: currentPassword,
        password,
      },
    );
  },
  search(query) {
    const queryString = qs.stringify(query);
    return request.$http.get(`/v2/account/search-user/?${queryString}`);
  },
};
