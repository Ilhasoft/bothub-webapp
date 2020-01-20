import TYPES from '../types';

export default {
  [TYPES.SET_REPOSITORY_RELATED_UUID](state, { ownerNickname, slug, uuid }) {
    state.relatedUuid = Object.assign(
      {},
      state.relatedUuid,
      {
        [`${ownerNickname}/${slug}`]: uuid,
      },
    );
  },
  setRepository(state, value) {
    state.selectedRepository = value;
  },
  updateRepository(state, value) {
    state.updateRepository = value;
  },
  updateEvaluateResultId(state, { id, version }) {
    state.evaluateResultId = id;
    state.evaluateResultVersion = version;
    state.currentTabSelected = 1;
  },
  updateEvaluateLanguage(state, value) {
    state.evaluateLanguage = value;
  },
  updateCurrentTab(state, value) {
    state.currentTabSelected = value;
  },
  setRepositoryVersion(state, value) {
    state.repositoryVersion = value.id;
    state.repositoryVersionName = value.name;
  },
};
