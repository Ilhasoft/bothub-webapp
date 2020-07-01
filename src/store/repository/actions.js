/* eslint-disable camelcase */
import repository from '@/api/repository';
import update from '@/api/update';
import TYPES from '../types';


export default {


  async getNewRepositorySchema() {
    const response = await repository.getNewSchema();
    return response;
  },
  getVersions(store, { limit, query }) {
    return repository.getVersions(limit, query);
  },
  getFirstFiveVersions(store, repositoryUuid) {
    return repository.getFirstFiveVersions(repositoryUuid);
  },
  setDefaultVersion(store, { repositoryUuid, id }) {
    return repository.setDefaultVersion(repositoryUuid, id);
  },
  editVersion(store, { repositoryUuid, id, name }) {
    return repository.editVersion(repositoryUuid, id, name);
  },
  deleteVersion(store, id) {
    return repository.deleteVersion(id);
  },
  async addNewVersion(store, { repositoryUUID, versionUUID, name }) {
    return repository.addNewVersion(repositoryUUID, versionUUID, name);
  },
  getAllRepositories(limit = 20) {
    /* istanbul ignore next */
    return repository.getAll(limit);
  },
  searchRepositories(store, querys) {
    /* istanbul ignore next */
    return repository.search({ ...querys, limit: 21 });
  },
  getRepository(store, { ownerNickname, slug }) {
    /* istanbul ignore next */
    return repository.get(ownerNickname, slug);
  },
  trainRepository(store, { repositoryUuid, repositoryVersion }) {
    /* istanbul ignore next */
    return repository.train(repositoryUuid, repositoryVersion);
  },
  debugParse(store, {
    repositoryUUID, repositoryVersion, language, text,
  }) {
    /* istanbul ignore next */
    return repository.debugParse(repositoryUUID, repositoryVersion, language, text);
  },
  searchLogs(store, { repositoryUUID, query, limit }) {
    return repository.searchLogs(repositoryUUID, query, limit);
  },
  analyzeText(store, {
    repositoryUUID, repositoryVersion, language, text,
  }) {
    /* istanbul ignore next */
    return repository.analyze(repositoryUUID, repositoryVersion, language, text);
  },
  async getEditRepositorySchema(store, { repositoryUuid, repositoryVersion }) {
    /* istanbul ignore next */
    const response = await repository.getEditSchema(repositoryUuid, repositoryVersion);
    return response;
  },
  async getTrainingStatus(store, { repositoryUUID, version }) {
    const response = await repository.getRepositoryInfo(repositoryUUID, version);
    if (!response.data) return null;
    const {
      ready_for_train,
      requirements_to_train,
      languages_warnings,
      examples__count,
      evaluate_languages_count,
      intents_list,
    } = response.data;
    return {
      ready_for_train,
      requirements_to_train,
      languages_warnings,
      examples__count,
      evaluate_languages_count,
      intents_list,
    };
  },
  editRepository(store, {
    ownerNickname,
    repositorySlug,
    name,
    slug,
    language,
    categories,
    description,
    is_private: isPrivate,
    algorithm,
    use_competing_intents: useCompetingIntents,
    use_name_entities: useNameEntities,
    use_analyze_char: useAnalyzeChar,
    use_transformer_entities: useTransformerEntities,
    repositoryUuid,
  }) {
    return repository.edit(
      ownerNickname,
      repositorySlug,
      name,
      slug,
      language,
      categories,
      description,
      isPrivate,
      algorithm,
      useCompetingIntents,
      useNameEntities,
      useAnalyzeChar,
      useTransformerEntities,
      repositoryUuid,
    );
  },
  getRepositoryLanguagesStatus(store, { repositoryUUID }) {
    return repository.getLanguagesStatus(repositoryUUID);
  },
  repositoryVoteUp(store, { ownerNickname, slug }) {
    return repository.voteUp(ownerNickname, slug);
  },
  repositoryVoteDown(store, { ownerNickname, slug }) {
    return repository.voteDown(ownerNickname, slug);
  },
  repositoryUpdateAuthorizationRole(store, { repositoryUuid, userNickname, newRole }) {
    return repository.updateAuthorizationRole(
      repositoryUuid,
      userNickname,
      newRole,
    );
  },
  repositoryAuthorizationList(store, { repositoryUuid, limit = 20 }) {
    return repository.getAuthorizationList(repositoryUuid, limit);
  },
  async getRequestRepositoryAuthorizationSchema() {
    const response = await repository.getRequestAuthorizationSchema();
    return response;
  },
  requestRepositoryAuthorization(store, { repositoryUuid, text }) {
    return repository.requestAuthorization(repositoryUuid, text);
  },
  repositoryAuthorizationRequestsList(store, { repositoryUuid }) {
    return repository.getAuthorizationRequestsList(repositoryUuid);
  },
  approveRequestAuthorization(store, { repositoryUuid, id }) {
    return repository.approveRequestAuthorization(repositoryUuid, id);
  },
  removeAuthorization(store, { repositoryUuid, id }) {
    return repository.removeAuthorization(repositoryUuid, id);
  },
  rejectRequestAuthorization(store, { id }) {
    return repository.rejectRequestAuthorization(id);
  },
  getUpdatesList(store, { repositoryUuid }) {
    return update.search(repositoryUuid);
  },
  setUpdateVersionsState({ commit }, payload) {
    commit('updateVersionsState', payload);
  },
  setUpdateRepository({ commit }, payload) {
    commit('updateRepository', payload);
  },
  setUpdateEvaluateResultId({ commit }, payload) {
    commit('updateEvaluateResultId', payload);
  },
  setEvaluateLanguage({ commit }, payload) {
    commit('updateEvaluateLanguage', payload);
  },
  setRepository({ commit }, payload) {
    commit('setRepository', payload);
  },
  async setRepositoryRelatedUuid({ commit }, payload) {
    await commit(TYPES.SET_REPOSITORY_RELATED_UUID, payload);
  },
  setRepositoryVersion({ commit }, payload) {
    commit('setRepositoryVersion', payload);
  },
};
