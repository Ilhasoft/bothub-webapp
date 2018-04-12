import window from 'global/window';

import TYPES from '../types';

export default {
  [TYPES.SET_TOKEN](state, token) {
    state.token = token;
    /* istanbul ignore next */
    if (window.localStorage) {
      window.localStorage.setItem('authToken', token);
    }
  },
};
