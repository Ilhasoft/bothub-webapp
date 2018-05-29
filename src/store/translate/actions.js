import translate from '@/api/translate';

export default {
  async newTranslation(store, { exampleId, language, text, entities }) {
    const response = await translate.new(exampleId, language, text, entities);
    return response;
  },
  async getTranslations(store, { repositoryUuid, query }) {
    return translate.translations(repositoryUuid, query);
  },
};
