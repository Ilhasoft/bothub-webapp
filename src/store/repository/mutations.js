import TYPES from '../types';

export default {
  [TYPES.SET_REPOSITORY_RELATED_UUID](state, {
    ownerNickname, slug, uuid,
  }) {
    state.relatedUuid = Object.assign(
      {},
      state.relatedUuid,
      {
        [`${ownerNickname}/${slug}/`]: uuid,
      },
    );
  },
  setRepository(state, value) {
    state.selectedRepository = value;
  },
  updateVersionsState(state, value) {
    state.updateVersions = value;
  },
  updateRepository(state, value) {
    state.updateRepository = value;
  },
  updateEvaluateResultId(state, { id, version }) {
    state.evaluateResultId = id;
    state.evaluateResultVersion = version;
  },
  updateEvaluateLanguage(state, value) {
    state.evaluateLanguage = value;
  },
  setRepositoryVersion(state, value) {
    if (state.repositoryVersion !== value.version.id) {
      state.repositoryVersion = {
        id: value.version.id,
        repositoryUUID: value.repositoryUUID,
      };
      state.repositoryVersionName = value.version.name;
    }
  },
};
