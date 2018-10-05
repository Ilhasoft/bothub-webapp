import qs from 'query-string';

import utils from './utils';


export default {
  search(repositoryUuid, query = {}) {
    const queryString = qs.stringify({
      repository_uuid: repositoryUuid,
      ...query,
    });
    return new utils.List(`/updates/?${queryString}`);
  },
};
