import tutorial from '@/api/tutorial';

export default {
  async setTutorialActive({ commit }, name) {
    commit('updateActiveTutorial', name);
  },
  async setTutorialInactive({ commit }) {
    commit('updateActiveTutorial', null);
  },
  async setTutorialMenuActive({ commit }) {
    commit('updateActiveMenu', true);
  },
  async setTutorialMenuInactive({ commit }) {
    commit('updateActiveMenu', false);
  },
  async setFinalModal({ commit }, value) {
    commit('updateFinalModal', value);
  },
  // eslint-disable-next-line no-unused-vars
  async setFinalizationMessage({ commit }) {
    localStorage.setItem('finalizationMessage', true);
  },
  async updateFinalizationMessage({ commit }) {
    commit('finalizationMessage', localStorage.getItem('finalizationMessage'));
  },
  async finishTutorial({ commit }, name) {
    commit('updateActiveTutorial', null);
    const finishedString = localStorage.getItem('finishedTutorials') || '{}';
    const finished = JSON.parse(finishedString);
    finished[name] = 'finished';
    localStorage.setItem('finishedTutorials', JSON.stringify(finished));
  },
  async updateTutorialsDone({ commit }) {
    commit('tutorialsDone', JSON.parse(localStorage.getItem('finishedTutorials')));
  },
  // eslint-disable-next-line no-unused-vars
  async setCreateIntelligence({ commit }, name) {
    const finishedString = localStorage.getItem('finishedTutorials') || '{}';
    const finished = JSON.parse(finishedString);
    finished[name] = 'finished';
    localStorage.setItem('finishedTutorials', JSON.stringify(finished));
  },
  // eslint-disable-next-line no-unused-vars
  async clearTutorial() {
    localStorage.removeItem('finishedTutorials');
  },
  async clearFinalizatioMessage() {
    localStorage.removeItem('finalizationMessage');
  },
  getUserRepositories(store, limit, offset) {
    return tutorial.myRepositories(limit, offset);
  },
  getRepositoryStatus(store, { repositoryUUID, repositoryVersion }) {
    return tutorial.trainingStatus(repositoryUUID, repositoryVersion);
  },
  async setRepositoryTraining({ commit }, value) {
    commit('updateRepositoryTraining', value);
  },
  getRepositoryVersion(store, { query }) {
    return tutorial.repositoryVersion(query);
  },
};
