import window from 'global/window';

import TYPES from '../types';

export default {
  [TYPES.RETRIEVE_AUTH_TOKEN](state) {
    /* istanbul ignore next */
    if (window.localStorage) {
      state.token = window.localStorage.getItem('authToken');
    }
  },
  [TYPES.SET_TOKEN](state, token) {
    state.token = token;
    /* istanbul ignore next */
    if (window.localStorage) {
      window.localStorage.setItem('authToken', token);
    }
  },
};
