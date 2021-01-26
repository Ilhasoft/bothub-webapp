import TYPES from '../types';


export default {
  [TYPES.CACHE_FETCH](state, {
    className, identifier, attributes,
  }) {
    state.cachedFetch = {
      ...state.cachedFetch,
      [`${className}/${identifier}`]: attributes,
    };
  },
};
