import TYPES from './types';

export default {
  [TYPES.SET_UPDATE_PROJECTS](state) {
    state.updateProjects = !state.updateProjects;
  }
};
