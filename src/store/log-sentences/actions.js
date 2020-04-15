export default {
  newLogSentence({ commit }, payload) {
    commit('setLogSentence', payload);
  },
  removeLogSentence({ commit }, payload) {
    commit('deleteLogSentence', payload);
  },
};
