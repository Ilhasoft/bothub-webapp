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
  getResultsData(repositoryUuid, resultId) {
    return request.$http.get(`/v2/evaluate/results/${resultId}/?repository_uuid=${repositoryUuid}`);
  },
  getAllResultsLog(repositoryUuid, resultId) {
    return request.$http.get(`/v2/evaluate/results/${resultId}/?repository_uuid=${repositoryUuid}`);
  },
  allVersions(repositoryUuid) {
    return new utils.List(`/v2/evaluate/results?repository_uuid=${repositoryUuid}`);
  },
  async resultSearch(repositoryUuid, query = {}) {
    const queryString = qs.stringify({
      repository_uuid: repositoryUuid,
      ...query,
    });
    return request.$http.get(`/v2/evaluate/results/1/?${queryString}`);
  },
  runEvaluate(owner, slug, language) {
    return request.$http.post(
      `/repository/${owner}/${slug}/evaluate/`,
      {
        language,
      },
    );
  },
};
