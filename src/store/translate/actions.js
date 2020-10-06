import translate from '@/api/translate';

export default {
  async newTranslation(store, {
    exampleId, language, text, entities,
  }) {
    const response = await translate.new(exampleId, language, text, entities);
    return response;
  },
  async editTranslation(store, {
    translationId, text, entities, language, originalExample,
  }) {
    const response = await translate.edit(translationId, text, entities, language, originalExample);
    return response;
  },
  async getTranslations(store, {
    limit = 20, repositoryUuid, repositoryVersion, ...query
  }) {
    return translate.translations(repositoryUuid, repositoryVersion, query, limit);
  },
  async getTranslationFromSentence(store, {
    repositoryUuid, repositoryVersion, originalId, toLanguage,
  }) {
    return translate.translationFromSentence(
      repositoryUuid, repositoryVersion, originalId, toLanguage,
    );
  },
  async deleteTranslation(store, { translationId }) {
    return translate.delete(translationId);
  },
  async exportTranslations(store, {
    repositoryUuid, versionUUID, fromLanguage, toLanguagem, statusTranslation,
  }) {
    return translate.exportTranslate(repositoryUuid, versionUUID, fromLanguage,
      toLanguagem, statusTranslation);
  },
  async importTranslations(store, {
    repositoryUuid, versionUUID, formData,
  }) {
    return translate.importTranslate(repositoryUuid, versionUUID, formData);
  },
  async getAutoTranslateProgress(store, { repositoryUUID, repositoryVersion }) {
    return translate.autoTranslateStatus(repositoryUUID, repositoryVersion);
  },
  async autoTranslate(store, { repositoryUUID, repositoryVersion, targetLanguage }) {
    return translate.auto(repositoryUUID, repositoryVersion, targetLanguage);
  },
  createExternalToken(store, { repositoryVersion, language }) {
    return translate.createExternalToken(repositoryVersion, language);
  },
  getExternalTokens(store, { repositoryUuid, limit = 12 }) {
    return translate.getExternalTokens(repositoryUuid, limit);
  },
  deleteExternalToken(store, { uuid }) {
    return translate.deleteExternalToken(uuid);
  },
};
