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
  getCurrentRepository(state) {
    return state.selectedRepository;
  },
  getEvaluateLanguage(state) {
    return state.evaluateLanguage ? state.evaluateLanguage : state.selectedRepository.language;
  },
  getUpdateVersionsState(state) {
    return state.updateVersions;
  },
  getSelectedVersion(state) {
    return state.repositoryVersion;
  },
  getNameVersion(state) {
    return state.repositoryVersionName;
  },
  versionEnabled() {
    return process.env.VERSION_ENABLED;
  },
};
