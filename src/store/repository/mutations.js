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
  updateRepository(state, value) {
    state.updateRepository = value;
  },
  updateEvaluateResultId(state, value) {
    state.evaluateResultId = value;
  },
  updateEvaluateLanguage(state, value) {
    state.evaluateLanguage = value;
  },
};
