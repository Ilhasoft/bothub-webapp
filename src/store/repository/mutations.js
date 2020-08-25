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
    if (!value || !value.version) return;

    if (state.repositoryVersion !== value.version.id) {
      state.repositoryVersion = {
        id: value.version.id,
        repositoryUUID: value.repositoryUUID,
      };
      state.repositoryVersionName = value.version.name;
    }
  },
  updateRepositoryTraining(state, value) {
    state.repositoryIsTraining = value;
  },
  updateValueProgress(state, value) {
    const repositoryTrain = state.whichRepositoryIsTrain.find(train => train.id === value.id);
    const findIndex = state.whichRepositoryIsTrain.indexOf(repositoryTrain);
    if (findIndex !== -1) {
      state.whichRepositoryIsTrain[findIndex].progress = value.progress;
    }
  },
  updateTrainResponse(state, value) {
    state.TrainResponse = value;
  },
  addRepositoryIsTrain(state, value) {
    state.whichRepositoryIsTrain.push({
      id: value.id,
      version: value.version,
      progress: 5,
    });
  },
  removeRepositoryIsTrain(state, value) {
    const repositories = state.whichRepositoryIsTrain.filter(
      valueId => valueId.id !== value.id && valueId.version !== value.version,
    );
    state.whichRepositoryIsTrain = repositories;
  },
};
