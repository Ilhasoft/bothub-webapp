import qs from 'query-string';

import request from '@/api/request';
import utils from '@/api/utils';


export default {
  new(repository, text, language, entities, intent) {
    return request.$http.post(
      '/v2/validation/new/',
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
      `/v2/validation/${id}/`,
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
    return request.$http.delete(`/v2/validation/${exampleId}/`);
  },
  search(repositoryUuid, query = {}) {
    const queryString = qs.stringify({
      repository_uuid: repositoryUuid,
      ...query,
    });
    return new utils.List(`/v2/validations/?${queryString}`);
  },
  get(id) {
    return request.$http.get(`/http://localhost:3000/sentence/${id}/`);
  },
};
