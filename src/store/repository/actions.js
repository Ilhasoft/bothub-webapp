/* eslint-disable camelcase */
import repository from '@/api/repository';
import update from '@/api/update';
import TYPES from './types';

export default {


  async getNewRepositorySchema() {
    const response = await repository.getNewSchema();
    return response;
  },
  getQAKnowledgeBases(store, { repositoryUUID, page }) {
    return repository.getQAKnowledgeBases(repositoryUUID, page);
  },
  createQAKnowledgeBase(store, { repositoryUUID, title }) {
    return repository.createQAKnowledgeBase(repositoryUUID, title);
  },
  editQAKnowledgeBase(store, { repositoryUUID, title, id }){
    return repository.editQAKnowledgeBase(repositoryUUID, title, id);
  },
  getQAKnowledgeBase(store, { repositoryUUID, id }) {
    return repository.getQAKnowledgeBase(repositoryUUID, id);
  },
  deleteQAKnowledgeBase(store, { repositoryUUID, id }) {
    return repository.deleteQAKnowledgeBase(repositoryUUID, id);
  },
  getQATexts(store, { repositoryUUID, knowledgeBaseId, page }) {
    return repository.getQATexts(repositoryUUID, knowledgeBaseId, page);
  },
  createQAText(store, { repositoryUUID, knowledgeBaseId, text, language }) {
    return repository.createQAText(repositoryUUID, knowledgeBaseId, text, language);
  },
  updateQAText(store, { repositoryUUID, knowledgeBaseId, id, text, language }) {
    return repository.updateQAText(repositoryUUID, knowledgeBaseId, id, text, language);
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
  searchRepositories(store, limit, offset) {
    /* istanbul ignore next */
    return repository.search(limit, offset);
  },
  searchProjectWithFlow(store, { projectUUID }) {
    /* istanbul ignore next */
    return repository.getProjectsWithFlows(projectUUID);
  },
  getCommunityRepository(store, querys) {
    /* istanbul ignore next */
    return repository.communityRepository({ ...querys, limit: 21 });
  },
  getRepository(store, { ownerNickname, slug }) {
    /* istanbul ignore next */
    return repository.get(ownerNickname, slug);
  },
  trainRepository(store, { repositoryUuid, repositoryVersion, repositoryLanguage }) {
    /* istanbul ignore next */
    return repository.train(repositoryUuid, repositoryVersion, repositoryLanguage);
  },
  debugParse(store, {
    repositoryUUID, repositoryVersion, language, text,
  }) {
    /* istanbul ignore next */
    return repository.debugParse(repositoryUUID, repositoryVersion, language, text);
  },
  searchLogs(store, { repositoryVersionLanguage, query, limit }) {
    return repository.searchLogs(repositoryVersionLanguage, query, limit);
  },
  getLogs(store){
    return repository.getLogs();
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
  getRepositoryLanguagesStatus(store, { repositoryUUID, version }) {
    return repository.getLanguagesStatus(repositoryUUID, version);
  },
  repositoryVoteUp(store, { ownerNickname, slug }) {
    return repository.voteUp(ownerNickname, slug);
  },
  repositoryVoteDown(store, { ownerNickname, slug }) {
    return repository.voteDown(ownerNickname, slug);
  },
  getRepositoryStatusTraining(store, { repositoryUUID, repositoryVersion }) {
    return repository.repositoryStatusTraining(repositoryUUID, repositoryVersion);
  },
  repositoryUpdateAuthorizationRole(store, { repositoryUuid, userNickname, newRole }) {
    return repository.updateAuthorizationRole(
      repositoryUuid,
      userNickname,
      newRole,
    );
  },
  async setRepositoryTraining({ commit }, value) {
    commit('updateRepositoryTraining', value);
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
  setRepository({ commit }, payload) {
    commit('setRepository', payload);
  },
  setRequirements({ commit }, payload) {
    commit('updateRequirements', payload);
  },
  async setRepositoryRelatedUuid({ commit }, payload) {
    await commit(TYPES.SET_REPOSITORY_RELATED_UUID, payload);
  },
  setRepositoryVersion({ commit }, payload) {
    commit('setRepositoryVersion', payload);
  },
  resetRepositoryVersion({ commit }) {
    commit('resetVersion');
  },
  getRepositoryRequirements(store, { repositoryUuid, version, repositoryLanguage }) {
    return repository.repositoryRequirements(repositoryUuid, version, repositoryLanguage);
  },
  setMigrateIntelligence(store, {
    repositoryVersion, AuthToken, Language, Classifier,
  }) {
    return repository.repositoryMigrateData(repositoryVersion, AuthToken, Language, Classifier);
  },
  setUploadRasaDataset(store, {
    formData, repositoryVersion, repositoryUUID,
  }) {
    return repository.repositoryUploadRasa(formData, repositoryVersion, repositoryUUID);
  },
};
