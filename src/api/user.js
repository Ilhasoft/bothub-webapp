import qs from 'query-string';

import request from './request';
import utils from './utils';


export default {
  profile(nickname) {
    return request.$http.get(
      `v2/account/user-profile/${nickname}/`,
    );
  },
  org_profile(nickname) {
    return request.$http.get(
      `v2/org/profile/${nickname}/`,
    );
  },
  myProfile() {
    return request.$http.get(
      '/v2/account/my-profile/',
    );
  },
  myRepositories(limit = 6, search, categories, language) {
    return new utils.Page('/v2/repository/search-repositories/', limit, { search, categories, language });
  },
  permissionRepositories(limit) {
    return new utils.Page('/v2/repository/repositories-permissions/', limit);
  },
  async getMyProfileSchema() {
    const { data } = await request.$http.options('/v2/account/my-profile/');
    return data.actions.PUT;
  },
  updateMyProfile(nickname, email, name, locale, biography = '') {
    return request.$http.put(
      '/v2/account/my-profile/',
      {
        nickname,
        email,
        name,
        locale,
        biography,
      },
    );
  },
  // TODO
  getPaymentHistory(limit = 10) {
    return new utils.Page('', limit);
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

  getReports(startDate, endDate, limit = 20) {
    return new utils.Page('/v2/repository/repository-reports/', limit, { start_date: startDate, end_date: endDate });
  },
};
