import example from '@/api/example';
import entity from '@/api/entity';


export default {
  async newExample(store, {
    repository, text, language, entities, intent,
  }) {
    const response = await example.new(repository, text, language, entities, intent);
    return response;
  },
  async getExamples(store, { repositoryUuid }) {
    const response = await example.all(repositoryUuid);
    return response;
  },
  async deleteExample(store, { id }) {
    await example.delete(id);
    return true;
  },
  async getExamplesToTranslate(store, {
    repositoryUuid, repositoryVersion, from, to,
  }) {
    const response = await example.search(repositoryUuid, repositoryVersion, {
      language: from,
      has_not_translation_to: to,
      ordering: 'created_at',
    });
    return response;
  },
  async getExample(store, { id }) {
    const response = await example.get(id);
    return response;
  },
  async getEntities(store, { repositoryUuid, value }) {
    const response = await entity.search(repositoryUuid, { value });
    return response;
  },
};
