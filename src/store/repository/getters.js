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
    if (!state.repositoryVersion) return null;
    return state.repositoryVersion.id;
  },
  getSelectedVersionRepository(state) {
    if (!state.repositoryVersion) return null;
    return state.repositoryVersion.repositoryUUID;
  },
  getNameVersion(state) {
    return state.repositoryVersionName;
  },
  getCheckRepositoryTrain(state) {
    return state.repositoryIsTraining;
  },
  versionEnabled() {
    return process.env.VERSION_ENABLED;
  },
};
