import qs from 'query-string';

import request from '@/api/request';
import utils from '@/api/utils';


export default {
  new(repository, text, language, entities, intent) {
    return request.$http.post(
      '/v2/evaluate/',
      {
        repository,
        text,
        language,
        entities,
        intent,
      },
    );
  },
  update(repository, text, language, entities, intent, id) {
    return request.$http.patch(
      `/v2/evaluate/${id}/`,
      {
        repository,
        text,
        language,
        entities,
        intent,
      },
    );
  },
  all(repositoryUuid) {
    return this.search(repositoryUuid);
  },
  delete(exampleId) {
    return request.$http.delete(`/v2/evaluate/${exampleId}/`);
  },
  search(repositoryUuid, query = {}) {
    const queryString = qs.stringify({
      repository_uuid: repositoryUuid,
      ...query,
    });
    return new utils.List(`/v2/evaluate/?${queryString}`);
  },
  get(id) {
    return request.$http.get(`/http://localhost:3000/evaliate/${id}/`);
  },
};
