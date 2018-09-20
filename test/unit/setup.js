import Vue from 'vue';
import MockDate from 'mockdate';

Vue.config.productionTip = false;

process.env.SUPPORTED_LANGUAGES = 'en|pt';
process.env.VERSION = '0.0.0';

MockDate.set(1534341842684);
