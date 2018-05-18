import { LANGUAGES } from '.';


export default (Vue) => {
  /* istanbul ignore next */
  Vue.filter('languageVerbose', lang => LANGUAGES[lang]);

  /* istanbul ignore next */
  Vue.filter('percent', value => `${(value * 100).toFixed(1)}%`);
};
