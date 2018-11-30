import TYPES from '../types';


export default {
  cacheFetch({ commit }, payload) {
    commit(TYPES.CACHE_FETCH, payload);
  },
};
