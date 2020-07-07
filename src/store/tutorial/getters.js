export default {
  activeTutorial(state) {
    return state.activeTutorial;
  },
  finishedTutorials() {
    const finishedString = localStorage.getItem('finishedTutorials') || '{}';
    return JSON.parse(finishedString);
  },
};
