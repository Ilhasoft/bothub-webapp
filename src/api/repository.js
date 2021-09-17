import qs from 'query-string';
import request from './request';
import utils from './utils';


export default {

  async getNewSchema() {
    const { data } = await request.$http.options('/v2/repository/repository-details');
    return data.actions.POST;
  },
  getQAKnowledgeBases(repositoryUUID, page = 0) {
    const limit = 20;
    const offset = limit * page;

    return request.$http.get('v2/repository/qa/knowledge-base/', {
      params: {
        repository_uuid: repositoryUUID,
        limit,
        offset,
      },
    });
  },
  createQAKnowledgeBase(repositoryUUID, title) {
    return request.$http.post('v2/repository/qa/knowledge-base/', {
      repository: repositoryUUID,
      title,
    });
  },
  editQAKnowledgeBase(repositoryUUID, title, id){
    return request.$http.patch(`v2/repository/qa/knowledge-base/${id}/`, {
      title,
    }, {
      params: {
        repository_uuid: repositoryUUID
      },
    });
  },
  getQAKnowledgeBase(repositoryUUID, id) {
    return request.$http.get(`v2/repository/qa/knowledge-base/${id}/`, {
      params: {
        repository_uuid: repositoryUUID,
      },
    });
  },
  deleteQAKnowledgeBase(repositoryUUID, id) {
    return request.$http.delete(`v2/repository/qa/knowledge-base/${id}/`, {
      params: {
        repository_uuid: repositoryUUID,
      },
    });
  },
  getQATexts(repositoryUUID, knowledgeBaseId, page = 0) {
    const limit = 20;
    const offset = limit * page;
    return request.$http.get('v2/repository/qa/text/', {
      params: {
        repository_uuid: repositoryUUID,
        knowledge_base_id: knowledgeBaseId,
        limit,
        offset,
      },
    });
  },
  createQAText(repositoryUUID, knowledgeBaseId, text, language) {
    return request.$http.post('v2/repository/qa/text/', {
      repository_uuid: repositoryUUID,
      knowledge_base: knowledgeBaseId,
      text,
      language
    });
  },
  updateQAText(repositoryUUID, knowledgeBaseId, id, text, language) {
    return request.$http.put(`v2/repository/qa/text/${id}/`, {
      knowledge_base: knowledgeBaseId,
      text,
      language
    }, {
      params: {
        repository_uuid: repositoryUUID,
      },
    });
  },
  getAll(limit = 20) {
    return new utils.Page('/repository/repositories/', limit);
  },
  getVersions(limit, query) {
    return new utils.Page('/v2/repository/version/', limit, query);
  },
  searchLogs(repositoryVersionLanguage, query, limit) {
    return new utils.Page('/v2/repository/log/', limit, { repository_version_language: repositoryVersionLanguage, ...query });
  },
  makeVersionDefault(repositoryUUID, versionUUID) {
    return request.$http.patch(
      `/v2/repository/version/${versionUUID}/`,
      {
        id: versionUUID,
        repository: repositoryUUID,
      },
    );
  },
  addNewVersion(repositoryUUID, versionUUID, name) {
    return request.$http.post(
      '/v2/repository/version/',
      {
        id: versionUUID,
        name,
        repository: repositoryUUID,
      },
    );
  },
  getFirstFiveVersions(repositoryUuid) {
    return request.$http.get(`/v2/repository/version/?repository=${repositoryUuid}&limit=5`);
  },
  setDefaultVersion(repositoryUuid, id) {
    return request.$http.patch(`/v2/repository/version/${id}/`,
      {
        repository: repositoryUuid,
        id,
        is_default: true,
      });
  },
  deleteVersion(id) {
    return request.$http.delete(`/v2/repository/version/${id}/`);
  },
  search(limit, offset) {
    const queryString = qs.stringify(limit, offset);
    return request.$http.get(`/v2/repository/repositories/?${queryString}`);
  },
  communityRepository(query, limit = 20) {
    return new utils.Page('/v2/repository/repositories/', limit, query);
  },
  searchByOrg(orgNickname, limit = 20, search, categories, language) {
    return new utils.Page('/v2/repository/search-repositories/', limit, {
      nickname: orgNickname, search, categories, language,
    });
  },
  editVersion(repository, id, name) {
    return request.$http.patch(`/v2/repository/version/${id}/`,
      {
        name,
        repository,
      });
  },
  get(ownerNickname, slug) {
    return request.$http.get(`/v1/repository/${ownerNickname}/${slug}/`);
  },
  train(repositoryUUID, repositoryVersion, repositoryLanguage) {
    return request.$http.post(`/v2/repository/repository-details/${repositoryUUID}/train/`, {
      repository_version: repositoryVersion,
      language: repositoryLanguage
    });
  },
  analyze(repositoryUUID, repositoryVersion, language, text) {
    return request.$http.post(
      `/v2/repository/repository-details/${repositoryUUID}/analyze/`,
      {
        repository_version: repositoryVersion,
        language,
        text,
      },
    );
  },
  getRepositoryInfo(repositoryUUID, version) {
    return request.$http.get(
      `/v2/repository/info/${repositoryUUID}/${version}`,
    );
  },
  getProjectsWithFlows(projectUUID) {
    const queryString = qs.stringify({
      project_uuid: projectUUID,
    });
    return request.$http.get(
      `/v2/repository/repositories/list_project_organizatiton/?${queryString}`,
    );
  },
  debugParse(repositoryUUID, repositoryVersion, language, text) {
    return request.$http.post(
      `/v2/repository/repository-details/${repositoryUUID}/debug_parse/`,
      {
        repository_version: repositoryVersion,
        language,
        text,
      },
    );
  },
  async getEditSchema(repositoryUuid) {
    const { data } = await request.$http.options(`/v2/repository/repository-details/${repositoryUuid}/`);
    return data.actions.PUT;
  },
  edit(ownerNickname,
    slug,
    name,
    newSlug,
    language,
    categories,
    description,
    isPrivate,
    algorithm,
    useCompetingIntents, useNameEntities, useAnalyzeChar, useTransformerEntities,
    repositoryUuid) {
    return request.$http.patch(
      `/v2/repository/repository-details/${repositoryUuid}/`,
      {
        name,
        slug: newSlug,
        language,
        categories,
        description,
        is_private: isPrivate,
        algorithm,
        use_competing_intents: useCompetingIntents,
        use_name_entities: useNameEntities,
        use_analyze_char: useAnalyzeChar,
        use_transformer_entities: useTransformerEntities,
      },
    );
  },
  getLanguagesStatus(repositoryUUID, version) {
    return request.$http.get(
      `/v2/repository/info/${repositoryUUID}/${version}/languagesstatus/`,
    );
  },
  vote(ownerNickname, slug, value) {
    return request.$http.post(
      `/v1/repository/${ownerNickname}/${slug}/vote/`,
      {
        vote: value,
      },
    );
  },
  voteUp(ownerNickname, slug) {
    return this.vote(ownerNickname, slug, 1);
  },
  voteDown(ownerNickname, slug) {
    return this.vote(ownerNickname, slug, -1);
  },
  updateAuthorizationRole(repositoryUuid, userNickname, role) {
    return request.$http.patch(
      `/v2/repository/authorizations/${repositoryUuid}/${userNickname}/`,
      { role },
    );
  },
  getAuthorizationList(repositoryUuid, limit) {
    return new utils.Page('/v2/repository/authorizations/', limit, { repository: repositoryUuid });
  },
  async getRequestAuthorizationSchema() {
    const { data } = await request.$http.options('/v2/repository/authorization-requests/');
    return data.actions.POST;
  },
  requestAuthorization(repositoryUuid, text) {
    return request.$http.post(
      '/v2/repository/authorization-requests/',
      {
        repository: repositoryUuid,
        text,
      },
    );
  },
  removeAuthorization(repositoryUuid, id) {
    return request.$http.delete(`/v2/repository/authorization-requests/${id}/`, {
      repository: repositoryUuid,
    });
  },
  getAuthorizationRequestsList(repositoryUuid, limit = 20) {
    return new utils.Page('/v2/repository/authorization-requests/', limit, { repository_uuid: repositoryUuid });
  },
  approveRequestAuthorization(repositoryUuid, id) {
    return request.$http.put(`/v2/repository/authorization-requests/${id}/`, {
      repository: repositoryUuid,
    });
  },
  rejectRequestAuthorization(id) {
    return request.$http.delete(`/v2/repository/authorization-requests/${id}/`);
  },
  repositoryStatusTraining(repositoryUUID, repositoryVersion) {
    const queryString = qs.stringify({
      repository_uuid: repositoryUUID,
      repository_version: repositoryVersion,
      type_processing: 0,
    });
    return request.$http.get(`/v2/repository/task-queue/?${queryString}`);
  },
  repositoryRequirements(repositoryUUID, version, repositoryLanguage) {
    return request.$http.get(
      `/v2/repository/train/info/${repositoryUUID}/${version}/${repositoryLanguage}`
    );
  },
  repositoryMigrateData(repositoryVersion, AuthToken, Language, Classifier) {
    return request.$http.post(
      '/v2/repository/repository-migrate/',
      {
        repository_version: repositoryVersion,
        auth_token: AuthToken,
        language: Language,
        classifier: Classifier,
      },
    );
  },
  repositoryUploadRasa(formData, repositoryVersion, repositoryUUID) {
    return request.$http.put(
      `/v2/repository/upload-rasa-file/${repositoryUUID}/${repositoryVersion}/`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'arraybuffer',
      },
    );
  },
};
