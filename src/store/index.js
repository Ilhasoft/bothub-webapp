import Vue from 'vue';
import Vuex from 'vuex';

import Auth from './auth';
import LoginModal from './login-modal';
import User from './user';
import Repository from './repository';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    Auth,
    LoginModal,
    User,
    Repository,
  },
});

store.dispatch('retriveAuthToken');

export default store;
