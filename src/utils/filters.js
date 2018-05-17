import { LANGUAGES } from '.';


export default (Vue) => {
  /* istanbul ignore next */
  Vue.filter('languageVerbose', lang => LANGUAGES[lang]);
};
