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
  getCurrentRepository(state) {
    return state.selectedRepository;
  },
  getEvaluateLanguage(state) {
    return state.evaluateLanguage ? state.evaluateLanguage : state.selectedRepository.language;
  },
};
