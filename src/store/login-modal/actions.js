import TYPES from '../types';

export default {
  async openLoginModal({ commit }, { next, redirectToWhenFails } = {}) {
    await commit(TYPES.OPEN_LOGIN_MODAL, { next, redirectToWhenFails });
  },

  async closeLoginModal({ commit }) {
    await commit(TYPES.CLOSE_LOGIN_MODAL);
  },
};
