export default {
  authToken(state) {
    return state.token;
  },
  authenticated(state) {
    return !!state.token;
  },
  getOrgSelected(state) {
    return state.org;
  },
  getProjectSelected(state) {
    return state.project;
  },
};
