import evaluateExample from '@/api/v2/evaluate-example';
import entity from '@/api/entity';


export default {
  async newevaluateExample(store, {
    repository, text, language, entities, intent,
  }) {
    const response = await evaluateExample.new(repository, text, language, entities, intent);
    return response;
  },
  async updateevaluateExample(store, {
    repository, text, language, entities, intent, id,
  }) {
    const response = await evaluateExample.update(repository, text, language, entities, intent, id);
    return response;
  },
  async getExamplesTest(store, { repositoryUuid }) {
    const response = await evaluateExample.all(repositoryUuid);
    return response;
  },
  async deleteevaluateExample(store, { id }) {
    await evaluateExample.delete(id);
    return true;
  },

  async getevaluateExample(store, { id }) {
    const response = await evaluateExample.get(id);
    return response;
  },
  async getEntitiesTest(store, { repositoryUuid, value }) {
    const response = await entity.search(repositoryUuid, { value });
    return response;
  },
};
