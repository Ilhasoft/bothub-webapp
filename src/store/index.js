import Vue from 'vue';
import Vuex from 'vuex';

import Auth from './auth';
import LoginModal from './login-modal';
import User from './user';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    Auth,
    LoginModal,
    User,
  },
});

store.dispatch('retriveAuthToken');

export default store;
