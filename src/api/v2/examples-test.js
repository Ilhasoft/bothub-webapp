import qs from 'query-string';

import request from '@/api/request';
import utils from '@/api/utils';


export default {
  new(repository, text, language, entities, intent) {
    return request.$http.post(
      'http://localhost:3000/sentence',
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
    const queryString = qs.stringify({ repository_uuid: repositoryUuid });
    return new utils.List(`/http://localhost:3000/sentence/?${queryString}`);
  },
  delete(exampleId) {
    return request.$http.delete(`/http://localhost:3000/sentence/${exampleId}/`);
  },
  search(repositoryUuid, query = {}) {
    const queryString = qs.stringify({
      repository_uuid: repositoryUuid,
      ...query,
    });
    return new utils.List('http://localhost:3000/sentence/');
  },
  get(id) {
    return request.$http.get(`/http://localhost:3000/sentence/${id}/`);
  },
};
