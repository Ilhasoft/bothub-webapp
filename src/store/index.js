import Vue from 'vue';
import Vuex from 'vuex';

import Auth from './auth';
import User from './user';
import Repository from './repository';
import Category from './category';
import Example from './example';
import EvaluateExample from './evaluate-example';
import Translate from './translate';
import CachedFetch from './cached-fetch';
import Entity from './entity';
import News from './news';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    Auth,
    User,
    Repository,
    Category,
    Example,
    Translate,
    CachedFetch,
    EvaluateExample,
    Entity,
    News,
  },
});

store.dispatch('retriveAuthToken');

export default store;
