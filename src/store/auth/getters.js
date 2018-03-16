export default {
  authenticated(state) {
    return !!state.token;
  },
};
