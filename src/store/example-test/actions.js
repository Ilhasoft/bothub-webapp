import exampleTest from '@/api/v2/examples-test';
import entity from '@/api/entity';


export default {
  async newExampleTest(store, {
    repository, text, language, entities, intent,
  }) {
    const response = await exampleTest.new(repository, text, language, entities, intent);
    return response;
  },
  async updateExampleTest(store, {
    repository, text, language, entities, intent, id,
  }) {
    console.log(id, 'action');

    const response = await exampleTest.update(repository, text, language, entities, intent, id);
    return response;
  },
  async getExamplesTest(store, { repositoryUuid }) {
    const response = await exampleTest.all(repositoryUuid);
    return response;
  },
  async deleteExampleTest(store, { id }) {
    await exampleTest.delete(id);
    return true;
  },

  async getExampleTest(store, { id }) {
    const response = await exampleTest.get(id);
    return response;
  },
  async getEntitiesTest(store, { repositoryUuid, value }) {
    const response = await entity.search(repositoryUuid, { value });
    return response;
  },
};
