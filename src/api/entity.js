import qs from 'query-string';
import request from './request';
import utils from './utils';


export default {
  search(repositoryUuid, query = {}) {
    const queryString = qs.stringify({
      repository_uuid: repositoryUuid,
      ...query,
    });
    return new utils.List(`/v2/repository/entities?${queryString}`);
  },
  edit(group, entityId, value) {
    return request.$http.patch(
      `/v2/repository/entities/${entityId}/`,
      {
        group,
        value,
      },
    );
  },
};
