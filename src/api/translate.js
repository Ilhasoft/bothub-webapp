import qs from 'query-string';
import request from './request';
import utils from './utils';

export default {
  new(exampleId, language, text, entities) {
    return request.$http.post(
      '/v2/repository/translation/',
      {
        original_example: exampleId,
        language,
        text,
        entities,
      },
    );
  },
  edit(translationId, text, entities, language, originalExample) {
    return request.$http.patch(
      `/v2/repository/translation/${translationId}/`,
      {
        text,
        entities,
        language,
        original_example: originalExample,
      },
    );
  },
  translationFromSentence(repositoryUuid, repositoryVersion, originalId, toLanguage) {
    const queryString = qs.stringify({
      repository_uuid: repositoryUuid,
      repository_version: repositoryVersion,
      original_example_id: originalId,
      to_language: toLanguage,
      limit: 1,
    });
    return request.$http.get(
      `/v2/repository/translation/?${queryString}`,
    );
  },
  translations(repositoryUuid, repositoryVersion, query = {}, limit) {
    return new utils.Page('/v2/repository/translation/', limit, {
      repository_uuid: repositoryUuid, repository_version: repositoryVersion, ...query,
    });
  },
  delete(translationId) {
    return request.$http.delete(`/v2/repository/translation/${translationId}/`);
  },
  exportTranslate(repositoryUuid, versionUUID, fromLanguage, toLanguagem, statusTranslation) {
    const queryString = qs.stringify({
      of_the_language: fromLanguage,
      for_the_language: toLanguagem,
      with_translation: statusTranslation,
    });
    return request.$http.get(`/v2/repository/translation-export/${repositoryUuid}/${versionUUID}/?${queryString}`, {
      responseType: 'arraybuffer',
    });
  },
  importTranslate(repositoryUuid, versionUUID, formData) {
    return request.$http.put(`/v2/repository/translation-export/${repositoryUuid}/${versionUUID}/`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'arraybuffer',
      });
  },
  auto(repositoryUuid, versionUUID, targetLanguage) {
    return request.$http.post(`/v2/repository/info/${repositoryUuid}/${versionUUID}/auto_translation/`,
      { target_language: targetLanguage });
  },
  autoTranslateStatus(repositoryUUID, repositoryVersion) {
    const queryString = qs.stringify({
      repository_uuid: repositoryUUID,
      repository_version: repositoryVersion,
      type_processing: 1,
    });
    return request.$http.get(`/v2/repository/task-queue/?${queryString}`);
  },
};
