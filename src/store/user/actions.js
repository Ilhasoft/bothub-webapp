import auth from '@/api/auth';
import TYPES from '../types';

export default {
  async updateMyProfile({ commit, dispatch, getters }) {
    if (!getters.authenticated) {
      commit(TYPES.SET_NICKNAME_AUTHENTICATED, { nickname: null });
    } else {
      try {
        const response = await auth.myProfile();
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
    const response = await auth.profile(nickname);
    /* istanbul ignore next */
    commit(TYPES.SET_PROFILE, {
      nickname,
      data: response.data,
    });
  },
};
