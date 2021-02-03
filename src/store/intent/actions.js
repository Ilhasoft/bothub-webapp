import intent from '@/api/intent';
import TYPES from './types';

export default {
  async editIntentName(store, {
    intentId, text, repositoryVersion,
  }) {
    const response = await intent.editIntentName(
      intentId,
      text,
      repositoryVersion,
    );
    return response;
  },
  async getIntentSuggestion(store, { id, language }) {
    const response = await intent.intentSuggestions(id, language);
    return response;
  },
  setEditingStatus({ commit }, payload) {
    commit(TYPES.SET_EDITING, payload);
  },
  setSelectedSuggestion({ commit }, payload) {
    commit(TYPES.SET_SELECTED_SUGGESTION, payload);
  },
  removeSelectedSuggestion({ commit }, payload) {
    commit(TYPES.REMOVE_SELECTED_SUGGESTION, payload);
  },
  changeSelectedSuggestion({ commit }, payload) {
    commit(TYPES.CHANGE_SELECTED_SUGGESTION, payload);
  },
  clearSelectedSuggestion({ commit }) {
    commit(TYPES.CLEAR_SELECTED_SUGGESTION);
  },
};
