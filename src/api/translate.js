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
  edit(translationId, language, text, entities) {
    return request.$http.patch(
      `/v2/repository/translation/${translationId}/`,
      {
        text,
        entities,
      },
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
};
