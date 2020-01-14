import Vue from 'vue';
import VueI18n from 'vue-i18n';

import en from '@/locales/en';

Vue.use(VueI18n);

const messages = {
  'en-us': en,
};

const i18n = new VueI18n({
  locale: 'en-us',
  messages,
});

export default i18n;
