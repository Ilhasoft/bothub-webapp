import qs from 'query-string';

import request from './request';
import utils from './utils';


export default {
  async getNewSchema() {
    const { data } = await request.$http.options('/v2/repository/repository/');
    return data.actions.POST;
  },
  getAll() {
    return new utils.List('/repository/repositories/');
  },
  search(query) {
    const queryString = qs.stringify(query);
    return new utils.List(`/v2/repository/repositories/?${queryString}`);
  },
  get(ownerNickname, slug) {
    return request.$http.get(`/v1/repository/${ownerNickname}/${slug}/`);
  },
  train(ownerNickname, slug) {
    return request.$http.get(`/v1/repository/${ownerNickname}/${slug}/train/`);
  },
  analyze(ownerNickname, slug, language, text) {
    return request.$http.post(
      `/v1/repository/${ownerNickname}/${slug}/analyze/`,
      {
        language,
        text,
      },
    );
  },
  async getEditSchema(ownerNickname, slug) {
    const { data } = await request.$http.options(`/v1/repository/${ownerNickname}/${slug}/`);
    return data.actions.PUT;
  },
  edit(ownerNickname, slug, name, newSlug, language, categories, description, isPrivate,
    algorithm, useCompetingIntents, useNameEntities) {
    return request.$http.patch(
      `/v1/repository/${ownerNickname}/${slug}/`,
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
      `/authorization-role/${repositoryUuid}/${userNickname}/`,
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
  getAuthorizationRequestsList(repositoryUuid) {
    const queryString = qs.stringify({
      repository_uuid: repositoryUuid,
    });
    return new utils.List(`/v2/repository/authorization-requests/?${queryString}`);
  },
  approveRequestAuthorization(id) {
    return request.$http.put(`/v2/repository/authorization-requests/${id}/`);
  },
  rejectRequestAuthorization(id) {
    return request.$http.delete(`/v2/repository/authorization-requests/${id}/`);
  },
};
