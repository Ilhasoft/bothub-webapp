import qs from 'query-string';
import utils from '../utils';


export default {
  search(repositoryUuid, repositoryVersion, query = {}) {   
    console.log(repositoryVersion, 'version here');
     
    const queryString = qs.stringify({
      repository_uuid: repositoryUuid,
      repository_version: repositoryVersion,
      ...query,
    });
    return new utils.List(`/v2/repository/examples/?${queryString}`);
  },
  all(repositoryUuid) {
    return this.search(repositoryUuid);
  },
};
