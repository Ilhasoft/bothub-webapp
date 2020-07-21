export default {
  updateActiveTutorial(state, name) {
    state.activeTutorial = name;
  },
  updateActiveMenu(state, value) {
    state.activeMenu = value;
  },
  tutorialsDone(state, name) {
    state.finishedTutorial = name;
  },
};
