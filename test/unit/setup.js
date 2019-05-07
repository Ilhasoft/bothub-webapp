import Vue from 'vue';
import MockDate from 'mockdate';

Vue.config.productionTip = false;

process.env.SUPPORTED_LANGUAGES = 'en|pt';
process.env.VERSION = '0.0.0';
process.env.BOTHUB_NLP_BASE_URL = 'http://localhost:2657/';
process.env.BOTHUB_WEBAPP_BASE_URL = 'http://localhost:8080/';

MockDate.set(1534341842684);

window.alert = () => {};
window.matchMedia = () => ({});
window.scrollTo = () => {};
