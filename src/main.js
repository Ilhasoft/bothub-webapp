import Vue from 'vue';
import Buefy from 'buefy';
import VueInteractivePaycard from 'vue-interactive-paycard';
import VueMoment from 'vue-moment';
import BH from 'bh';
import * as Sentry from '@sentry/browser';
import { Vue as VueIntegration } from '@sentry/integrations';
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
Vue.use(VueInteractivePaycard);
Vue.config.productionTip = false;
applyFilters(Vue);

if (process.env.BOTHUB_WEBAPP_USE_SENTRY && process.env.BOTHUB_WEBAPP_SENTRY) {
  Sentry.init({
    dsn: process.env.BOTHUB_WEBAPP_SENTRY,
    integrations: [new VueIntegration({ Vue, attachProps: true })],
    environment: process.env.NODE_ENV,
    logErrors: true,
  });
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  components: { App },
  template: '<App />',
  store,
});
