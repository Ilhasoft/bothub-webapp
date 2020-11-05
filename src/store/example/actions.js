import example from '@/api/example';
import entity from '@/api/entity';
import _intent from '@/api/intent';

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
    repositoryUuid, version, query, limit = 20, startCreatedAt, endCreatedAt,
  }) {
    return example.search(repositoryUuid, version, query, limit, startCreatedAt, endCreatedAt);
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
  async getExampleSuggestion(store, { id }) {
    const response = await example.suggestions(id);
    return response;
  },
  async getEntities(store, { repositoryUuid, repositoryVersion, value }) {
    const response = await entity.search(repositoryUuid, repositoryVersion, { value });
    return response;
  },
  async editEntityName(store, {
    entityId, value, repositoryVersion,
  }) {
    const response = await entity.editEntityName(
      entityId,
      value,
      repositoryVersion,
    );
    return response;
  },
  async editIntentName(store, {
    intentId, text, repositoryVersion,
  }) {
    const response = await _intent.editIntentName(
      intentId,
      text,
      repositoryVersion,
    );
    return response;
  },
  getAllEntities(store, {
    repositoryUuid, repositoryVersion,
  }) {
    const response = entity.getEntities(
      repositoryUuid,
      repositoryVersion,
    );
    return response;
  },
};
