export default {
  updateActiveTutorial(state, name) {
    state.activeTutorial = name;
  },
  updateActiveMenu(state, value) {
    state.activeMenu = value;
  },
  updateFinalModal(state, value) {
    state.finalModal = value;
  },
  finalizationMessage(state, value) {
    state.finalMessage = value;
  },
  tutorialsDone(state, name) {
    state.finishedTutorial = name;
  },
};
