import Vue from 'vue';
import VueI18n from 'vue-i18n';

import en from '@/locales/en.json';

Vue.use(VueI18n);

const languages = {
  'en-US': en,
};

const i18n = new VueI18n({
  locale: navigator.language || navigator.userLanguage,
  languages,
});

export default i18n;
