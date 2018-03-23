import TYPES from './types';

export default {
  [TYPES.OPEN_LOGIN_MODAL](state, next) {
    state.open = true;
    state.next = next;
  },

  [TYPES.CLOSE_LOGIN_MODAL](state) {
    state.open = false;
    state.next = null;
  },
};
