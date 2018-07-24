import qs from 'query-string';

import request from './request';
import utils from './utils';


export default {
  new(repository, text, entities, intent) {
    return request.$http.post(
      '/example/new/',
      {
        repository,
        text,
        entities,
        intent,
      },
    );
  },
  all(repositoryUuid) {
    const queryString = qs.stringify({ repository_uuid: repositoryUuid });
    return new utils.List(`/examples/?${queryString}`);
  },
  delete(exampleId) {
    return request.$http.delete(`/example/${exampleId}/`);
  },
  search(repositoryUuid, query = {}) {
    const queryString = qs.stringify({
      repository_uuid: repositoryUuid,
      ...query,
    });
    return new utils.List(`/examples/?${queryString}`);
  },
  get(id) {
    return request.$http.get(`/example/${id}/`);
  },
};
