import integration from '@/api/integration';

export default {
  setIntegrationRepository(
    store,
    { repository_version, repository_uuid, name, project_uuid, organization }
  ) {
    return integration.integrateRepository(
      repository_version,
      repository_uuid,
      name,
      project_uuid,
      organization
    );
  },
  getIntegrationRepository(
    store,
    { repository_version, repository_uuid, project_uuid, organization }
  ) {
    return integration.verifyIntegrateRepository(
      repository_version,
      repository_uuid,
      project_uuid,
      organization
    );
  },
  removeIntegrationRepository(
    store,
    { repository_version, repository_uuid, name, project_uuid, organization }
  ) {
    return integration.disintegrateRepository(
      repository_version,
      repository_uuid,
      project_uuid,
      organization
    );
  }
};
