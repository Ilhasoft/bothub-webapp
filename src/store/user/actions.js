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
        });
        commit(TYPES.SET_NICKNAME_AUTHENTICATED, { nickname: response.data.nickname });
      } catch (error) {
        /* istanbul ignore next */
        dispatch('logout');
      }
    }
  },
  async updateProfile({ commit }, { nickname }) {
    /* istanbul ignore next */
    const response = await user.profile(nickname);
    /* istanbul ignore next */
    commit(TYPES.SET_PROFILE, {
      nickname,
      data: response.data,
    });
  },
  getMyRepositories() {
    return user.myRepositories();
  },
};
