import window from 'global/window';

import TYPES from './types';

export default {
  [TYPES.RETRIEVE_AUTH_TOKEN](state) {
    if (window.localStorage) state.token = window.localStorage.getItem('authToken');
  },
  [TYPES.SET_TOKEN](state, token) {
    state.token = token;
    if (window.localStorage) window.localStorage.setItem('authToken', token);
  },
};
