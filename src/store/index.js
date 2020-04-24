import Vue from 'vue';
import Vuex from 'vuex';

import Auth from './auth';
import LoginModal from './login-modal';
import User from './user';
import Repository from './repository';
import Category from './category';
import Example from './example';
import EvaluateExample from './evaluate-example';
import Translate from './translate';
import CachedFetch from './cached-fetch';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    Auth,
    LoginModal,
    User,
    Repository,
    Category,
    Example,
    Translate,
    CachedFetch,
    EvaluateExample,
  },
});

store.dispatch('retriveAuthToken');

export default store;
