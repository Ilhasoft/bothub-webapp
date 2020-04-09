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
  translations(repositoryUuid, query = {}, limit) {
    return new utils.Page('/v2/repository/translation/', limit, { repository_uuid: repositoryUuid, ...query });
  },
  delete(translationId) {
    return request.$http.delete(`/v2/repository/translation/${translationId}/`);
  },
};
