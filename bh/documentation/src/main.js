import Vue from 'vue';
import BH from 'bh';
import App from './App';

import 'bh/src/assets/scss/bh.scss';
import 'highlight.js/styles/github.css';


Vue.use(BH);

const appElem = document.createElement('div');
document.body.insertBefore(appElem, document.body.childNodes[0]);

new Vue({
  render: h => h(App),
}).$mount(appElem);
