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
};
