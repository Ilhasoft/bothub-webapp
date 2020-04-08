import translate from '@/api/translate';

export default {
  async newTranslation(store, {
    exampleId, language, text, entities,
  }) {
    const response = await translate.new(exampleId, language, text, entities);
    return response;
  },
  async getTranslations(store, { limit = 20, repositoryUuid, ...query }) {
    return translate.translations(repositoryUuid, query, limit);
  },
  async deleteTranslation(store, { translationId }) {
    return translate.delete(translationId);
  },
};
