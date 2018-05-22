export default {
  myProfile: ({ profiles, nicknameAuthenticated }) => {
    const profile = profiles[nicknameAuthenticated] || {};
    return profile.data || {};
  },
  getProfile: ({ profiles }) => (nickname) => {
    const profile = profiles[nickname] || {};
    return (profile.data || { name: nickname, nickname });
  },
  getProfileLastUpdate: ({ profiles }) => (nickname) => {
    const profile = profiles[nickname] || {};
    return (profile.lastUpdate || 0);
  },
};
