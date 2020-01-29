import repository from '@/api/repository';
import update from '@/api/update';
import TYPES from '../types';


export default {


  async getNewRepositorySchema() {
    const response = await repository.getNewSchema();
    return response;
  },
  getVersions(store, {
    repositoryUUID, orderField, asc, limit, offset,
  }) {
    return repository.getVersions(repositoryUUID, orderField, asc, limit, offset);
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
  getLogs(store, repositoryUUID) {
    return [
      {
          "id": 6,
          "text": "estou com medo",
          "user_agent": "PostmanRuntime/7.22.0",
          "nlp_log": {
              "intent": {
                  "name": "affirmative",
                  "confidence": 0.9992188811302185
              },
              "intent_ranking": [
                  {
                      "name": "affirmative",
                      "confidence": 0.9992188811302185
                  },
                  {
                      "name": "negative",
                      "confidence": 0.0
                  },
                  {
                      "name": "doubt",
                      "confidence": 0.0
                  },
                  {
                      "name": "bias",
                      "confidence": 0.0
                  }
              ],
              "labels_list": [],
              "entities_list": [],
              "entities": {},
              "text": "estou com medo",
              "repository_version": 6647,
              "language": "pt_br"
          },
          "user": 303,
          "log_intent": {
              "21": {
                  "intent": "affirmative",
                  "confidence": 0.999218881130219,
                  "is_default": true
              },
              "22": {
                  "intent": "negative",
                  "confidence": 0.0,
                  "is_default": false
              },
              "23": {
                  "intent": "doubt",
                  "confidence": 0.0,
                  "is_default": false
              },
              "24": {
                  "intent": "bias",
                  "confidence": 0.0,
                  "is_default": false
              }
          }
      },
      {
          "id": 5,
          "text": "oi",
          "user_agent": "PostmanRuntime/7.22.0",
          "nlp_log": {
              "intent": {
                  "name": "bias",
                  "confidence": 0.9993326663970947
              },
              "intent_ranking": [
                  {
                      "name": "bias",
                      "confidence": 0.9993326663970947
                  },
                  {
                      "name": "doubt",
                      "confidence": 0.02122560888528824
                  },
                  {
                      "name": "negative",
                      "confidence": 0.0
                  },
                  {
                      "name": "affirmative",
                      "confidence": 0.0
                  }
              ],
              "labels_list": [],
              "entities_list": [],
              "entities": {},
              "text": "oi",
              "repository_version": 6647,
              "language": "pt_br"
          },
          "user": 303,
          "log_intent": {
              "17": {
                  "intent": "bias",
                  "confidence": 0.999332666397095,
                  "is_default": true
              },
              "18": {
                  "intent": "doubt",
                  "confidence": 0.0212256088852882,
                  "is_default": false
              },
              "19": {
                  "intent": "negative",
                  "confidence": 0.0,
                  "is_default": false
              },
              "20": {
                  "intent": "affirmative",
                  "confidence": 0.0,
                  "is_default": false
              }
          }
      },
      {
          "id": 4,
          "text": "estou com medo",
          "user_agent": "PostmanRuntime/7.22.0",
          "nlp_log": {
              "intent": {
                  "name": "affirmative",
                  "confidence": 0.9992188811302185
              },
              "intent_ranking": [
                  {
                      "name": "affirmative",
                      "confidence": 0.9992188811302185
                  },
                  {
                      "name": "negative",
                      "confidence": 0.0
                  },
                  {
                      "name": "doubt",
                      "confidence": 0.0
                  },
                  {
                      "name": "bias",
                      "confidence": 0.0
                  }
              ],
              "labels_list": [],
              "entities_list": [],
              "entities": {},
              "text": "estou com medo",
              "repository_version": 6647,
              "language": "pt_br"
          },
          "user": 303,
          "log_intent": {
              "13": {
                  "intent": "affirmative",
                  "confidence": 0.999218881130219,
                  "is_default": true
              },
              "14": {
                  "intent": "negative",
                  "confidence": 0.0,
                  "is_default": false
              },
              "15": {
                  "intent": "doubt",
                  "confidence": 0.0,
                  "is_default": false
              },
              "16": {
                  "intent": "bias",
                  "confidence": 0.0,
                  "is_default": false
              }
          }
      },
      {
          "id": 3,
          "text": "estou com medo",
          "user_agent": "PostmanRuntime/7.22.0",
          "nlp_log": {
              "intent": {
                  "name": "affirmative",
                  "confidence": 0.9992188811302185
              },
              "intent_ranking": [
                  {
                      "name": "affirmative",
                      "confidence": 0.9992188811302185
                  },
                  {
                      "name": "negative",
                      "confidence": 0.0
                  },
                  {
                      "name": "doubt",
                      "confidence": 0.0
                  },
                  {
                      "name": "bias",
                      "confidence": 0.0
                  }
              ],
              "labels_list": [],
              "entities_list": [],
              "entities": {},
              "text": "estou com medo",
              "repository_version": 6647,
              "language": "pt_br"
          },
          "user": 303,
          "log_intent": {
              "9": {
                  "intent": "affirmative",
                  "confidence": 0.999218881130219,
                  "is_default": true
              },
              "10": {
                  "intent": "negative",
                  "confidence": 0.0,
                  "is_default": false
              },
              "11": {
                  "intent": "doubt",
                  "confidence": 0.0,
                  "is_default": false
              },
              "12": {
                  "intent": "bias",
                  "confidence": 0.0,
                  "is_default": false
              }
          }
      },
      {
          "id": 2,
          "text": "estou com medo",
          "user_agent": "PostmanRuntime/7.22.0",
          "nlp_log": {
              "intent": {
                  "name": "affirmative",
                  "confidence": 0.9992188811302185
              },
              "intent_ranking": [
                  {
                      "name": "affirmative",
                      "confidence": 0.9992188811302185
                  },
                  {
                      "name": "negative",
                      "confidence": 0.0
                  },
                  {
                      "name": "doubt",
                      "confidence": 0.0
                  },
                  {
                      "name": "bias",
                      "confidence": 0.0
                  }
              ],
              "labels_list": [],
              "entities_list": [],
              "entities": {},
              "text": "estou com medo",
              "repository_version": 6647,
              "language": "pt_br"
          },
          "user": 303,
          "log_intent": {
              "5": {
                  "intent": "affirmative",
                  "confidence": 0.999218881130219,
                  "is_default": true
              },
              "6": {
                  "intent": "negative",
                  "confidence": 0.0,
                  "is_default": false
              },
              "7": {
                  "intent": "doubt",
                  "confidence": 0.0,
                  "is_default": false
              },
              "8": {
                  "intent": "bias",
                  "confidence": 0.0,
                  "is_default": false
              }
          }
      },
      {
          "id": 1,
          "text": "estou com medo",
          "user_agent": "PostmanRuntime/7.22.0",
          "nlp_log": {
              "intent": {
                  "name": "affirmative",
                  "confidence": 0.9992188811302185
              },
              "intent_ranking": [
                  {
                      "name": "affirmative",
                      "confidence": 0.9992188811302185
                  },
                  {
                      "name": "negative",
                      "confidence": 0.0
                  },
                  {
                      "name": "doubt",
                      "confidence": 0.0
                  },
                  {
                      "name": "bias",
                      "confidence": 0.0
                  }
              ],
              "labels_list": [],
              "entities_list": [],
              "entities": {},
              "text": "estou com medo",
              "repository_version": 6647,
              "language": "pt_br"
          },
          "user": 303,
          "log_intent": {
              "1": {
                  "intent": "affirmative",
                  "confidence": 0.999218881130219,
                  "is_default": true
              },
              "2": {
                  "intent": "negative",
                  "confidence": 0.0,
                  "is_default": false
              },
              "3": {
                  "intent": "doubt",
                  "confidence": 0.0,
                  "is_default": false
              },
              "4": {
                  "intent": "bias",
                  "confidence": 0.0,
                  "is_default": false
              }
          }
      }
  ];
  }
};
