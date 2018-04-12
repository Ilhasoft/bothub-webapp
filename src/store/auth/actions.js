import auth from '@/api/auth';
import TYPES from '../types';

export default {
  async login({ commit, dispatch }, { username, password }) {
    const response = await auth.login(username, password);
    commit(TYPES.SET_TOKEN, response.data.token);
    dispatch('updateMyProfile');
  },
  retriveAuthToken({ commit }) {
    /* istanbul ignore next */
    if (window.localStorage) {
      commit(TYPES.SET_TOKEN, window.localStorage.getItem('authToken'));
    }
  },
  logout({ commit, dispatch }) {
    commit(TYPES.SET_TOKEN, null);
    dispatch('updateMyProfile');
  },
  async forgotPassword(store, { email }) {
    await auth.forgotPassword(email);
  },
  async resetPassword(store, { nickname, token, password }) {
    await auth.resetPassword(nickname, token, password);
  },
  async register(store, { email, name, nickname, password }) {
    await auth.register(email, name, nickname, password);
  },
};
