import user from '@/api/user';
import TYPES from '../types';


export default {
  async updateMyProfile({ commit, dispatch, getters }) {
    if (!getters.authenticated) {
      commit(TYPES.SET_NICKNAME_AUTHENTICATED, { nickname: null });
    } else {
      try {
        const response = await user.myProfile();
        commit(TYPES.SET_PROFILE, {
          nickname: response.data.nickname,
          data: response.data,
          lastUpdate: Date.now(),
        });
        commit(TYPES.SET_NICKNAME_AUTHENTICATED, { nickname: response.data.nickname });
      } catch (error) {
        /* istanbul ignore next */
        dispatch('logout');
      }
    }
  },
  async updateProfile({ commit, getters }, { nickname, forced }) {
    const lastUpdate = getters.getProfileLastUpdate(nickname);
    const profileVersionValidUntil = lastUpdate + (30 * 1000);
    if (profileVersionValidUntil < Date.now() || forced) {
      commit(TYPES.SET_PROFILE, {
        nickname,
        lastUpdate: Date.now(),
      });
      const response = await user.profile(nickname);
      commit(TYPES.SET_PROFILE, {
        nickname,
        data: response.data,
        lastUpdate: Date.now(),
      });
    }
  },
  getPaymentHistory(store, limit = 20) {
    return user.getPaymentHistory(limit);
  },
  getMyRepositories(store, limit = 20) {
    /* istanbul ignore next */
    return user.myRepositories(limit);
  },
  // TODO
  getContributingRepositories(store, limit = 20) {
    /* istanbul ignore next */
    return user.myRepositories(limit);
  },
  // TODO
  getUsingRepositories(store, limit = 20) {
    /* istanbul ignore next */
    return user.myRepositories(limit);
  },
  getUserReports(store, { query = {}, limit = 20 }) {
    return user.getReports(limit, query);
  },
  async getMyProfileSchema(nickname) {
    const schema = await user.getMyProfileSchema(nickname);
    return schema;
  },
  patchMyProfile(store, {
    nickname, email, name, locale,
  }) {
    return user.updateMyProfile(nickname, email, name, locale);
  },
  async getChangePasswordSchema() {
    const schema = await user.getChangePasswordSchema();
    return schema;
  },
  changePassword(store, { current_password: currentPassword, password }) {
    return user.changePassword(currentPassword, password);
  },
  searchUser(store, query) {
    return user.search(query);
  },
  async getOrgSchema() {
    // TODO: Unmock
    return {
      name: {
        label: 'Name',
        max_length: 48,
        read_only: false,
        required: true,
        style: {},
        type: 'string',
      },
      email: {
        label: 'Email',
        max_length: 48,
        read_only: false,
        required: true,
        style: {},
        type: 'email',
      },
      description: {
        label: 'Description',
        max_length: 48,
        read_only: false,
        required: true,
        style: {},
        type: 'textarea',
      },
    };
  },
};
