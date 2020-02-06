import evaluateExample from '@/api/v2/evaluate-example';
import entity from '@/api/entity';


export default {
  async newEvaluateExample(store, {
    repository, repositoryVersion, text, language, entities, intent,
  }) {
    const response = await evaluateExample.new(repository, repositoryVersion, text, language, entities, intent);
    return response;
  },
  async updateEvaluateExample(store, {
    repository, text, language, entities, intent, id,
  }) {
    const response = await evaluateExample.update(repository, text, language, entities, intent, id);
    return response;
  },
  async getExamplesTest(store, { repositoryUuid }) {
    const response = await evaluateExample.all(repositoryUuid);
    return response;
  },
  async deleteEvaluateExample(store, { id, repositoryUuid }) {
    await evaluateExample.delete(id, repositoryUuid);
    return true;
  },

  async getEvaluateExample(store, { id }) {
    const response = await evaluateExample.get(id);
    return response.data;
  },
  async getEntitiesTest(store, { repositoryUuid, value }) {
    const response = await entity.search(repositoryUuid, { value });
    return response;
  },
  async runNewEvaluate(store, { repositoryUUID, language }) {
    const response = await evaluateExample.runEvaluate(repositoryUUID, language);
    return response;
  },
  getAllVersions(store, { repositoryUuid }) {
    return evaluateExample.allVersions(repositoryUuid);
  },
  getResultsData(store, { repositoryUuid, resultId }) {
    return evaluateExample.getResultsData(repositoryUuid, resultId);
  },
  getAllResultsLog(store, { repositoryUuid, resultId }) {
    return evaluateExample.getAllResultsLog(repositoryUuid, resultId);
  },
};
