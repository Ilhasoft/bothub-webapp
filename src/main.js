import Vue from 'vue';
import Buefy from 'buefy';
import VueMoment from 'vue-moment';
import * as Sentry from '@sentry/browser';
import { Vue as VueIntegration } from '@sentry/integrations';
import VueTour from 'vue-tour';
import App from './App';
import router from './router';
import store from './store';
import applyFilters from './utils/filters';
import API from './utils/plugins/API';
import i18n from './utils/plugins/i18n';
import '@mdi/font/css/materialdesignicons.css';
import hljs from 'highlight.js';
import VueHighlightJS from 'vue-highlightjs';

Vue.use(Buefy);
Vue.use(VueMoment);
Vue.use(API);
Vue.use(VueTour);
Vue.use(hljs.vuePlugin);
Vue.use(VueHighlightJS);

Vue.config.productionTip = false;

applyFilters(Vue);

if ((process.env.VUE_APP_BOTHUB_WEBAPP_USE_SENTRY)
&& process.env.VUE_APP_BOTHUB_WEBAPP_SENTRY) {
  Sentry.init({
    dsn: process.env.VUE_APP_BOTHUB_WEBAPP_SENTRY,
    integrations: [new VueIntegration({ Vue, attachProps: true })],
    environment: process.env.NODE_ENV,
    logErrors: true,
  });
}

new Vue({
  el: '#app',
  i18n,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
