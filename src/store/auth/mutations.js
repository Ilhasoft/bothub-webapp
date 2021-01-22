import window from 'global/window';

import TYPES from '../types';

export default {
  [TYPES.SET_TOKEN](state, token) {
    state.token = token;
    /* istanbul ignore next */
    if (window.localStorage) {
      console.log('entering');
      if (token) {
        console.log(token);
        window.localStorage.setItem('authToken', token);
      } else {
        console.log('remove');
        window.localStorage.removeItem('authToken');
      }
    }
    console.log('left');
  },
};
