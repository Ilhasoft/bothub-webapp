export default {
  loginModalOpen(state) {
    return state.open;
  },
  loginModalTabValue(state) {
    return state.tabValue;
  },
  loginModalNext(state) {
    return state.next;
  },
  loginModalRedirectToWhenFails(state) {
    return state.redirectToWhenFails;
  },
};
