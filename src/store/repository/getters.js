export default {
  relatedUuid(state) {
    return state.relatedUuid;
  },
  getUpdateRepositoryState(state) {
    return state.updateRepository;
  },
  getCurrentRepository(state) {
    return state.selectedRepository;
  },
  getUpdateVersionsState(state) {
    return state.updateVersions;
  },
  getRequirements(state) {
    return state.requirements;
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
