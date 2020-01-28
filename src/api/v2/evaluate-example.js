import qs from 'query-string';

import request from '@/api/request';
import utils from '@/api/utils';


export default {
  new(repository, repositoryVersion, text, language, entities, intent) {
    console.log(repositoryVersion);
    
    return request.$http.post(
      '/v2/repository/evaluate/',
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
  update(repository, text, language, entities, intent, id) {
    return request.$http.patch(
      `/v2/repository/evaluate/${id}/`,
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
  get(repositoryUuid, repositoryVersion) {
    const queryString = qs.stringify({
      repository_uuid: repositoryUuid,
      repository_version: repositoryVersion,
    });
    return request.$http.get(`/v2/repository/evaluate?${queryString}`);
  },
  delete(exampleId, repositoryUuid) {
    return request.$http.delete(`/v2/repository/evaluate/${exampleId}/?repository_uuid=${repositoryUuid}`);
  },
  search(repositoryUuid, repositoryVersion, query = {}) {
    const queryString = qs.stringify({
      repository_uuid: repositoryUuid,
      repository_version: repositoryVersion,
      ...query,
    });
    return new utils.List(`/v2/repository/evaluate/?${queryString}`);
  },
  getResultsData(repositoryUuid, resultId) {
    return request.$http.get(`/v2/repository/evaluate/results/${resultId}/?repository_uuid=${repositoryUuid}`);
  },
  getAllResultsLog(repositoryUuid, resultId) {
    return request.$http.get(`/v2/repository/evaluate/results/${resultId}/?repository_uuid=${repositoryUuid}`);
  },
  allVersions(repositoryUuid) {
    return new utils.List(`/v2/repository/evaluate/results?repository_uuid=${repositoryUuid}`);
  },
  async resultSearch(repositoryUuid, query = {}) {
    const queryString = qs.stringify({
      repository_uuid: repositoryUuid,
      ...query,
    });
    return request.$http.get(`/v2/repository/evaluate/results/1/?${queryString}`);
  },
  runEvaluate(repositoryUUID, language) {
    return request.$http.post(
      `v2/repository/repository-info/${repositoryUUID}/evaluate/`,
      {
        language,
      },
    );
  },
};
