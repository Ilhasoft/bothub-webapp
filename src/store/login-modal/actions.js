import TYPES from '../types';

export default {
  openLoginModal({ commit }, { next, redirectToWhenFails } = {}) {
    commit(TYPES.OPEN_LOGIN_MODAL, { next, redirectToWhenFails });
  },

  closeLoginModal({ commit }) {
    commit(TYPES.CLOSE_LOGIN_MODAL);
  },
};
