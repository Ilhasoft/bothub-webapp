import TYPES from './types';

export default {
  [TYPES.SET_EDITING](state, value) {
    state.editingStatus = value;
  },
  [TYPES.SET_SELECTED_SUGGESTION](state, value) {
    state.selectedSuggestion.push(value);
  },
  [TYPES.CLEAR_SELECTED_SUGGESTION](state) {
    state.selectedSuggestion = [];
  },
  [TYPES.REMOVE_SELECTED_SUGGESTION](state, value) {
    const selectedFiltered = state.selectedSuggestion.filter(
      example => example.text !== value.text,
    );
    state.selectedSuggestion = selectedFiltered;
  },
  [TYPES.CHANGE_SELECTED_SUGGESTION](state, value) {
    // eslint-disable-next-line array-callback-return
    state.selectedSuggestion.map((element, index) => {
      if (element.id === value.id && element.text !== value.text) {
        state.selectedSuggestion[index] = value;
      }
    });
  },
};
