import qs from 'query-string';

import request from './request';
import utils from './utils';


export default {
  new(exampleId, language, text, entities) {
    return request.$http.post(
      '/translate-example/',
      {
        original_example: exampleId,
        language,
        text,
        entities,
      },
    );
  },
  translations(repositoryUuid, query) {
    const queryString = qs.stringify({ repository_uuid: repositoryUuid, ...query });
    return new utils.List(`/translations/?${queryString}`);
  },
  delete(translationId) {
    return request.$http.delete(`/translation/${translationId}/`);
  },
};
