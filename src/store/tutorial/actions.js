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
  getUserRepositories(store, limit, offset) {
    return tutorial.myRepositories(limit, offset);
  },
};
