import Vue from 'vue';
import Buefy from 'buefy';
import VueMoment from 'vue-moment';

import BH from 'bh';

import App from './App';
import router from './router';
import store from './store';
import applyFilters from './utils/filters';
import API from './utils/plugins/API';

import { library } from '@fortawesome/fontawesome-svg-core';
// internal icons
import { faCheck, faCheckCircle, faInfoCircle, faExclamationTriangle, faExclamationCircle,
    faArrowUp, faAngleRight, faAngleLeft, faAngleDown,
    faEye, faEyeSlash, faCaretDown, faCaretUp, faUpload, faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";


library.add(faCheck, faCheckCircle, faInfoCircle, faExclamationTriangle, faExclamationCircle,
  faArrowUp, faAngleRight, faAngleLeft, faAngleDown,
  faEye, faEyeSlash, faCaretDown, faCaretUp, faUpload, faCheckSquare);
Vue.component('vue-fontawesome', FontAwesomeIcon);

Vue.use(Buefy,
  { defaultIconComponent: 'vue-fontawesome',
  defaultIconPack: 'fas'}
);
Vue.use(VueMoment);
Vue.use(BH);
Vue.use(API);
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
