import TYPES from '../types';

export default {
  [TYPES.OPEN_LOGIN_MODAL](state, { next, redirectToWhenFails }) {
    state.open = true;
    state.next = next;
    state.redirectToWhenFails = redirectToWhenFails;
  },

  [TYPES.CLOSE_LOGIN_MODAL](state) {
    state.open = false;
    state.next = null;
  },
};
