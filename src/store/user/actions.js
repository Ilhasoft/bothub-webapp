import auth from '@/api/auth';
import TYPES from '../types';

export default {
  async updateMyProfile({ commit }) {
    try {
      const response = await auth.myProfile();
      commit(TYPES.SET_PROFILE, {
        nickname: response.data.nickname,
        data: response.data,
      });
      commit(TYPES.SET_NICKNAME_AUTHENTICATED, { nickname: response.data.nickname });
    } catch (error) {
      commit(TYPES.SET_NICKNAME_AUTHENTICATED, { nickname: null });
    }
  },
  async updateProfile({ commit }, { nickname }) {
    const response = await auth.profile(nickname);
    commit(TYPES.SET_PROFILE, {
      nickname,
      data: response.data,
    });
  },
};
