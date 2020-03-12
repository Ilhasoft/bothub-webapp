import qs from 'query-string';

import request from './request';
import utils from './utils';


export default {
  new(repository, repositoryVersion, text, language, entities, intent) {
    return request.$http.post(
      '/v2/repository/example/',
      {
        repository,
        repository_version: repositoryVersion,
        text,
        language,
        entities,
        intent,
      },
    );
  },
  all(repositoryUuid) {
    const queryString = qs.stringify({ repository_uuid: repositoryUuid });
    return new utils.List(`/v2/repository/examples/?${queryString}`);
  },
  delete(exampleId) {
    return request.$http.delete(`/v2/repository/example/${exampleId}/`);
  },
  search(repositoryUuid, query = {}, limit = 20) {
    return new utils.Page('/v2/repository/examples/', limit, {
      repository_uuid: repositoryUuid,
      ...query,
    });
  },
  get(id) {
    return request.$http.get(`/v2/repository/example/${id}/`);
  },
};
