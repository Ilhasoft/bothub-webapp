import example from '@/api/example';
import entity from '@/api/entity';


export default {
  async newExample(store, {
    repository, repositoryVersion, text, language, entities, intent, isCorrected = false,
  }) {
    // eslint-disable-next-line
    const response = await example.new(repository, repositoryVersion, text, language, entities, intent, isCorrected);
    return response;
  },
  async editSentence(store, {
    repository, version, text, language, entities, intent, id, isCorrected = false,
  }) {
    const response = await example.edit(
      repository,
      version,
      text,
      language,
      entities,
      intent,
      id,
      isCorrected,
    );
    return response;
  },
  async getExamples(store, { repositoryUuid }) {
    const response = await example.all(repositoryUuid);
    return response;
  },
  searchExamples(store, {
    repositoryUuid, version, query, limit = 20,
  }) {
    return example.search(repositoryUuid, version, query, limit);
  },
  async deleteExample(store, { id }) {
    await example.delete(id);
    return true;
  },
  async getExamplesToTranslate(store, {
    repositoryUuid, version, from, to, query,
  }) {
    const response = await example.search(repositoryUuid, version, {
      language: from,
      has_not_translation_to: to,
      ordering: 'created_at',
      ...query,
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
  async editEntityName(store, {
    entityId, value,
  }) {
    const response = await entity.editEntityName(
      entityId,
      value,
    );
    return response;
  },
};
