import Vue from 'vue';
import VueI18n from 'vue-i18n';

import en from '../../locales/en.json';
import ptbr from '../../locales/pt_br.json';

Vue.use(VueI18n);

const languages = {
  'en-US': en,
  'pt-BR': ptbr,
};

const numberFormats = {
  'en-US': {
    currency: {
      style: 'currency', currency: 'BRL', currencyDisplay: 'symbol',
    },
  },
  'pt-BR': {
    currency: {
      style: 'currency', currency: 'BRL', currencyDisplay: 'symbol',
    },
  },
};


const messages = Object.assign(languages);

const i18n = new VueI18n({
  locale: navigator.language || navigator.userLanguage,
  fallbackLocale: 'en-US',
  messages,
  numberFormats,
});

export default i18n;
