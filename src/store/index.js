import Vue from 'vue';
import Vuex from 'vuex';

import Auth from './auth';
import User from './user';
import Org from './org';
import Repository from './repository';
import Category from './category';
import Example from './example';
import EvaluateExample from './evaluate-example';
import Translate from './translate';
import CachedFetch from './cached-fetch';
import Entity from './entity';
import Intent from './intent';
import News from './news';
import Tutorial from './tutorial';
import External from './external';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    Auth,
    User,
    Org,
    Repository,
    Category,
    Example,
    Translate,
    CachedFetch,
    EvaluateExample,
    Entity,
    News,
    Tutorial,
    External,
    Intent,
  },
});

store.dispatch('retriveAuthToken');
window.addEventListener('message', (message) => {
  if (message.data.event !== 'login-with-token') return;
  const { token } = message.data;
  if (token) {
    store.dispatch('iframeLogin', { token });
  }
}, false);

export default store;
