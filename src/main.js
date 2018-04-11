import '@mdi/font/css/materialdesignicons.css';

import Vue from 'vue';
import Buefy from 'buefy';

import App from './App';
import router from './router';
import store from './store';

import AUTH_TYPES from './store/auth/types';

Vue.use(Buefy);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App />',
  store,
  beforeCreate() {
    this.$store.commit(AUTH_TYPES.RETRIEVE_AUTH_TOKEN);
  },
});
