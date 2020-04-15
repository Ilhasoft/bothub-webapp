
export default {
  setLogSentence(state, payload) {
    if (payload.length !== 0) {
      state.logSentences.push(payload);
    }
  },
  deleteLogSentence(state, payload) {
    // eslint-disable-next-line array-callback-return
    state.logSentences.map((el, i) => {
      if (el[0].text === payload[0].text) {
        state.logSentences.splice(i, 1);
      }
    });
  },
};
