export default {
  async setTutorialActive({ commit }, name) {
    commit('updateActiveTutorial', name);
  },
  async clearTutorial({ commit }) {
    commit('updateActiveTutorial', null);
  },
  async finishTutorial({ commit }, name) {
    commit('updateActiveTutorial', null);
    const finishedString = localStorage.getItem('finishedTutorials') || '{}';
    console.log(finishedString);
    const finished = JSON.parse(finishedString);
    finished[name] = 'finished';
    localStorage.setItem('finishedTutorials', JSON.stringify(finished));
  },
};
