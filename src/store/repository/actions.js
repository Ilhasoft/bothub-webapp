import repository from '@/api/repository';
import update from '@/api/update';
import TYPES from '../types';


export default {


  async getNewRepositorySchema() {
    const response = await repository.getNewSchema();
    return response;
  },
  getVersions(store, query) {
    return repository.getVersions(query);
  },
  makeVersionDefault(store, { repositoryUUID, versionUUID }) {
    return repository.makeVersionDefault(repositoryUUID, versionUUID);
  },
  editVersion(store, { repositoryUUID, versionUUID, name }) {
    return repository.editVersion(repositoryUUID, versionUUID, name);
  },
  addNewVersion(store, { repositoryUUID, versionUUID, name }) {
    return repository.addNewVersion(repositoryUUID, versionUUID, name);
  },
  deleteVersion(store, { repositoryUUID, versionUUID }) {
    return repository.deleteVersion(repositoryUUID, versionUUID);
  },
  getFirstFiveVersions(store, repositoryUuid) {
    return repository.getFirstFiveVersions(repositoryUuid);
  },
  getAllRepositories() {
    /* istanbul ignore next */
    return repository.getAll();
  },
  searchRepositories(store, querys) {
    /* istanbul ignore next */
    return repository.search(querys);
  },
  getRepository(store, { ownerNickname, slug }) {
    /* istanbul ignore next */
    return repository.get(ownerNickname, slug);
  },
  trainRepository(store, { repositoryUUID }) {
    /* istanbul ignore next */
    return repository.train(repositoryUUID);
  },
  searchLogs(store, { repositoryUUID, query }) {
    return repository.search(repositoryUUID, query);
  },
  analyzeText(store, {
    repositoryUUID, language, text,
  }) {
    /* istanbul ignore next */
    return repository.analyze(repositoryUUID, language, text);
  },
  async getEditRepositorySchema(store, { repositoryUuid }) {
    /* istanbul ignore next */
    const response = await repository.getEditSchema(repositoryUuid);
    return response;
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
      repositoryUuid,
    );
  },
  getRepositoryLanguagesStatus(store, { ownerNickname, slug }) {
    return repository.getLanguagesStatus(ownerNickname, slug);
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
  repositoryAuthorizationList(store, { repositoryUuid }) {
    return repository.getAuthorizationList(repositoryUuid);
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
  setUpdateRepository({ commit }, payload) {
    commit('updateRepository', payload);
  },
  setUpdateEvaluateResultId({ commit }, payload) {
    commit('updateEvaluateResultId', payload);
  },
  setEvaluateLanguage({ commit }, payload) {
    commit('updateEvaluateLanguage', payload);
  },
  updateCurrentTab({ commit }, tab) {
    commit('updateCurrentTab', tab);
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
