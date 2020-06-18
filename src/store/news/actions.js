export default {
  setLastVersionSeen(store, version) {
    localStorage.setItem('lastVersionSeen', version);
  },
};
