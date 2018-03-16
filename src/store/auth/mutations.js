import TYPES from './types';

export default {
  [TYPES.SET_TOKEN](state, token) {
    state.token = token;
  },
};
