import qs from 'query-string';
import request from './request';

export default {
  myRepositories(limit, offset) {
    const queryString = qs.stringify(limit, offset);
    return request.$http.get(`/v2/repository/search-repositories/?${queryString}`);
  },
  trainingStatus(repositoryUUID, repositoryVersion) {
    const queryString = qs.stringify({
      repository_uuid: repositoryUUID,
      repository_version: repositoryVersion,
    });
    return request.$http.get(`/v2/repository/task-queue/?${queryString}`);
  },
  repositoryVersion(limit = 1, query) {
    const queryString = qs.stringify(limit, query);
    return request.$http.get(`/v2/repository/version/?${queryString}`);
  },
};
