import Vue from 'vue';
import Buefy from 'buefy';
import VueMoment from 'vue-moment';

import BH from 'bh';

import App from './App';
import router from './router';
import store from './store';
import applyFilters from './utils/filters';
import API from './utils/plugins/API';
import i18n from '@/utils/plugins/i18n';

Vue.use(Buefy);
Vue.use(VueMoment);
Vue.use(BH);
Vue.use(API);
Vue.config.productionTip = false;
applyFilters(Vue);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  lang: {
    t: (key, params) => {
      // Where a countable property is given to the params
      // it means we are using plularization.
      if (params && params.countable !== undefined) {
        return i18n.tc(key, params.countable, params);
      }

      return i18n.t(key, [params]);
    },
  },
  router,
  components: { App },
  template: '<App />',
  store,
});
