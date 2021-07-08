import TYPES from '../types';

export default {
  [TYPES.SET_PROFILE](state, { nickname, data, lastUpdate }) {
    state.profiles = {
      ...state.profiles,
      [nickname]: {
        data,
        lastUpdate,
      },
    };
  },
  [TYPES.SET_NICKNAME_AUTHENTICATED](state, { nickname }) {
    state.nicknameAuthenticated = nickname;
  },
  [TYPES.SET_USERNAME](state, { username }) {
    state.username = username;
  },
};
