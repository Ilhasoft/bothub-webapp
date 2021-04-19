import evaluate from '@/api/v2/evaluate';
import TYPES from './types';

export default {
  async newEvaluateExample(store, {
    repository, repositoryVersion, text, language, entities, intent, isCorrected = false,
  }) {
    // eslint-disable-next-line
    const response = await evaluate.new(repository, repositoryVersion, text, language, entities, intent, isCorrected);
    return response;
  },
  searchEvaluateExamples(store, {
    repositoryUUID, version, query, limit = 20,
  }) {
    return evaluate.search(repositoryUUID, version, query, limit);
  },
  async updateEvaluateExample(store, {
    repository, version, text, language, entities, intent, id,
  }) {
    const response = await evaluate.update(
      repository,
      version,
      text,
      language,
      entities,
      intent,
      id,
    );
    return response;
  },
  async getExamplesTest(store, { repositoryUuid }) {
    const response = await evaluate.all(repositoryUuid);
    return response;
  },
  async deleteEvaluateExample(store, { id, repositoryUuid }) {
    await evaluate.delete(id, repositoryUuid);
    return true;
  },

  async getEvaluateExample(store, { id, version }) {
    const response = await evaluate.get(id, version);
    return response.data;
  },
  async runNewEvaluate(store, { repositoryUUID, language, version }) {
    const response = await evaluate.runEvaluate(repositoryUUID, language, version);
    return response;
  },
  async runNewEvaluateAutomatic(store, { repositoryUUID, language, version }) {
    const response = await evaluate.runEvaluateAutomatic(repositoryUUID, language, version);
    return response;
  },
  getAllResults(store, { repositoryUuid, version, limit = 20, crossValidation }) {
    return evaluate.allVersions(repositoryUuid, version, limit, crossValidation);
  },
  getResultsData(store, { repositoryUuid, resultId }) {
    return evaluate.getResultsData(repositoryUuid, resultId);
  },
  getAllResultsLog(store, { repositoryUuid, resultId, page = 1 }) {
    return evaluate.getAllResultsLog(repositoryUuid, resultId, page);
  },
  async getAutoEvaluateProgress(store, { repositoryUUID, repositoryVersion }) {
    return evaluate.getEvaluateStatus(repositoryUUID, repositoryVersion);
  },
  setSelectedEvaluate({ commit }, payload) {
    commit(TYPES.SET_COMPARE_EVALUATE, payload);
  },
  setEmptyCompareEvaluate({ commit }) {
    commit(TYPES.SET_EMPTY_COMPARE_EVALUATE);
  },
};
