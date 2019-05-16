export default {
  relatedUuid(state) {
    return state.relatedUuid;
  },
  getUpdateRepositoryState(state) {
    return state.updateRepository;
  },
  getEvaluateResultId(state) {
    return state.evaluateResultId;
  },
  getCurrentTab(state) {
    return state.currentTabSelected;
  },
  getEvaluateLanguage(state) {
    return state.evaluateLanguage ? state.evaluateLanguage : state.selectedRepository.language;
  },
};
