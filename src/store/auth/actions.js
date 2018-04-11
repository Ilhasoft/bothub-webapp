import auth from '@/api/auth';
import TYPES from './types';

export default {
  async login({ commit }, { username, password }) {
    const response = await auth.login(username, password);
    commit(TYPES.SET_TOKEN, response.data.token);
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
