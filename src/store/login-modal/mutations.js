import TYPES from '../types';

export default {
  [TYPES.OPEN_LOGIN_MODAL](state, { modalTabValue, next, redirectToWhenFails }) {
    state.open = true;
    state.tabValue = modalTabValue;
    state.next = next;
    state.redirectToWhenFails = redirectToWhenFails;
  },

  [TYPES.CLOSE_LOGIN_MODAL](state) {
    state.open = false;
    state.next = null;
  },
};
