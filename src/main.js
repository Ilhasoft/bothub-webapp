import Vue from 'vue';
import Buefy from 'buefy';
import VueMoment from 'vue-moment';
import BH from 'bh';
import App from './App';
import router from './router';
import store from './store';
import applyFilters from './utils/filters';
import API from './utils/plugins/API';
import i18n from './utils/plugins/i18n';

Vue.use(Buefy);
Vue.use(VueMoment);
Vue.use(BH);
Vue.use(API);
Vue.config.productionTip = false;
applyFilters(Vue);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  components: { App },
  template: '<App />',
  store,
});
