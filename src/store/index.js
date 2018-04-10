import Vue from 'vue';
import Vuex from 'vuex';

import Auth from './auth';
import LoginModal from './login-modal';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Auth,
    LoginModal,
  },
});
