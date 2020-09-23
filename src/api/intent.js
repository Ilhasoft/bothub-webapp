import request from './request';

export default {
  editIntentName(intentId, text, repositoryVersion) {
    return request.$http.patch(
      `/v2/repository/intent/${intentId}/`,
      {
        text,
        repository_version: repositoryVersion,
      },
    );
  },
};
