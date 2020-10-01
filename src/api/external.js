import qs from 'query-string';

import request from './requestExternal';
import utils from './utils';

export default {
  searchExamples(token, query = {}, limit = 20) {
    return new utils.Page('/v2/repository/examples/', limit, query, token);
  },
  translationFromSentence(token, originalId) {
    const queryString = qs.stringify({
      original_example_id: originalId,
      limit: 1,
    });
    return request.$http(token).get(
      `/v2/repository/translation/?${queryString}`,
    );
  },
  deleteTranslation(token, translationId) {
    return request.$http(token).delete(`/v2/repository/translation/${translationId}/`);
  },
  newTranslation(token, exampleId, text, entities) {
    return request.$http(token).post(
      '/v2/repository/translation/',
      {
        original_example: exampleId,
        text,
        entities,
      },
    );
  },
  editTranslation(token, translationId, text, entities, originalExample) {
    return request.$http(token).patch(
      `/v2/repository/translation/${translationId}/`,
      {
        text,
        entities,
        original_example: originalExample,
      },
    );
  },
};
