import qs from 'query-string';
import request from './request';

export default {
  async verifyIntegrateRepository(
    repository_version,
    repository_uuid,
    project_uuid,
    organization
  ) {
    const queryString = qs.stringify({
      project_uuid,
      organization
    });
    return request.$http.get(
      `/v2/repository/info/${repository_uuid}/${repository_version}/projectrepository/?${queryString}`
    );
  },
  async integrateRepository(repository_version, repository_uuid, name, project_uuid, organization) {
    return request.$http.post(
      `/v2/repository/info/${repository_uuid}/${repository_version}/add_repository_project/`,
      {
        project_uuid,
        name,
        organization
      }
    );
  },
  async disintegrateRepository(
    repository_version,
    repository_uuid,
    project_uuid,
    organization
  ) {
    return request.$http.post(
      `/v2/repository/info/${repository_uuid}/${repository_version}/remove_repository_project/`,
      {
        project_uuid,
        organization
      }
    );
  }
};
