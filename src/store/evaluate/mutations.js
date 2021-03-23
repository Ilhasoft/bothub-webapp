import TYPES from './types';

export default {
  [TYPES.SET_COMPARE_EVALUATE](state, value) {
    if (state.evaluatesToCompare.includes(value)){
      state.evaluatesToCompare = state.evaluatesToCompare.filter(
        example => example !== value,
      );
    } else {
      state.evaluatesToCompare.push(value)
    }
  },
  [TYPES.SET_EMPTY_COMPARE_EVALUATE](state) {
    state.evaluatesToCompare = []
  },
};
