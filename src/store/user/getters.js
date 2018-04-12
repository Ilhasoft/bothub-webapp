export default {
  myProfile: ({ profiles, nicknameAuthenticated }) => (profiles[nicknameAuthenticated] || {}),
  getProfile: ({ profiles }) => nickname => (profiles[nickname] || {}),
};
