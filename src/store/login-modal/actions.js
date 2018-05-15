import TYPES from '../types';

export default {
  openLoginModal({ commit }, next) {
    commit(TYPES.OPEN_LOGIN_MODAL, next);
  },

  closeLoginModal({ commit }) {
    commit(TYPES.CLOSE_LOGIN_MODAL);
  },
};
