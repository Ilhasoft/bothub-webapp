import external from '@/api/external';

export default {
  searchExamplesExternal(store, {
    token, query, limit = 20,
  }) {
    return external.searchExamples(token, query, limit);
  },
  async newTranslationExternal(store, {
    token, exampleId, text, entities,
  }) {
    return external.newTranslation(token, exampleId, text, entities);
  },
  async editTranslationExternal(store, {
    token, translationId, text, entities, originalExample,
  }) {
    return external.editTranslation(token, translationId, text, entities, originalExample);
  },
  async getTranslationsExternal(store, {
    token, limit = 20, ...query
  }) {
    return external.translations(token, query, limit);
  },
  async getTranslationFromSentenceExternal(store, { token, originalId }) {
    return external.translationFromSentence(
      token, originalId,
    );
  },
  async deleteTranslation(store, { token, translationId }) {
    return external.deleteTranslation(token, translationId);
  },
};
