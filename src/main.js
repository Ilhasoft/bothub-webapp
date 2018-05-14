import '@mdi/font/css/materialdesignicons.css';

import Vue from 'vue';
import Buefy from 'buefy';
import VueMoment from 'vue-moment';

import App from './App';
import router from './router';
import store from './store';

Vue.use(Buefy);
Vue.use(VueMoment);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App />',
  store,
});
