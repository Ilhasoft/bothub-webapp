import '@mdi/font/css/materialdesignicons.css';

import Vue from 'vue';
import Buefy from 'buefy';
import VueMoment from 'vue-moment';

import BH from 'bh';

import App from './App';
import router from './router';
import store from './store';
import applyFilters from './utils/filters';

Vue.use(Buefy);
Vue.use(VueMoment);
Vue.use(BH);
Vue.config.productionTip = false;
applyFilters(Vue);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App />',
  store,
});
