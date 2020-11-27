import qs from 'query-string';
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
  intentSuggestions(id, language) {
    const queryString = qs.stringify({
      language,
    });
    return request.$http.get(`/v2/repository/intent/${id}/intent_suggestions/?${queryString}`);
  },
};
