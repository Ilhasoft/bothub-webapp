import qs from 'query-string';

import request from './request';
import utils from './utils';

export default {

  async getNewSchema() {
    const { data } = await request.$http.options('/v2/repository/repository-info/');
    return data.actions.POST;
  },
  getAll() {
    return new utils.List('/repository/repositories/');
  },
  getVersions(limit, query) {
    return new utils.Page('/v2/repository/version/', limit, query);
  },
  searchLogs(repositoryUUID, query, limit) {
    return new utils.Page('/v2/repository/log/', limit, { repository_uuid: repositoryUUID, ...query });
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
  search(query) {
    const queryString = qs.stringify(query);
    return new utils.List(`/v2/repository/repositories/?${queryString}`);
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
  train(repositoryUUID, repositoryVersion) {
    return request.$http.post(
      `/v2/repository/repository-info/${repositoryUUID}/train/`,
      { repository_version: repositoryVersion },
    );
  },
  analyze(repositoryUUID, repositoryVersion, language, text) {
    return request.$http.post(
      `/v2/repository/repository-info/${repositoryUUID}/analyze/`,
      {
        repository_version: repositoryVersion,
        language,
        text,
      },
    );
  },
  debugParse(repositoryUUID, repositoryVersion, language, text) {
    return request.$http.post(
      `/v2/repository/repository-info/${repositoryUUID}/debug_parse/`,
      {
        repository_version: repositoryVersion,
        language,
        text,
      },
    );
  },
  async getEditSchema(repositoryUuid) {
    const { data } = await request.$http.options(`/v2/repository/repository-info/${repositoryUuid}/`);
    return data.actions.PUT;
  },
  edit(ownerNickname, slug, name, newSlug, language, categories, description, isPrivate,
    algorithm, useCompetingIntents, useNameEntities, useAnalyzeChar, repositoryUuid) {
    return request.$http.patch(
      `/v2/repository/repository-info/${repositoryUuid}/`,
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
      },
    );
  },
  getLanguagesStatus(ownerNickname, slug) {
    return request.$http.get(
      `/v1/repository/${ownerNickname}/${slug}/languagesstatus/`,
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
  getAuthorizationList(repositoryUuid) {
    const queryString = qs.stringify({ repository: repositoryUuid });
    return new utils.List(`/v2/repository/authorizations/?${queryString}`);
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
  getAuthorizationRequestsList(repositoryUuid) {
    const queryString = qs.stringify({
      repository_uuid: repositoryUuid,
    });
    return new utils.List(`/v2/repository/authorization-requests/?${queryString}`);
  },
  approveRequestAuthorization(repositoryUuid, id) {
    return request.$http.put(`/v2/repository/authorization-requests/${id}/`, {
      repository: repositoryUuid,
    });
  },
  rejectRequestAuthorization(id) {
    return request.$http.delete(`/v2/repository/authorization-requests/${id}/`);
  },
};
