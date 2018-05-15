import TYPES from '../types';

export default {
  [TYPES.SET_PROFILE](state, { nickname, data }) {
    state.profiles = Object.assign({ [nickname]: data }, state.profiles);
  },
  [TYPES.SET_NICKNAME_AUTHENTICATED](state, { nickname }) {
    state.nicknameAuthenticated = nickname;
  },
};
