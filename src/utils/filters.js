export default (Vue) => {
  Vue.filter('languageVerbose', lang => ({
    en: 'English',
    de: 'German',
    es: 'Spanish',
    pt: 'Portuguese',
    fr: 'French',
    it: 'Italian',
    nl: 'Dutch',
  })[lang]);
};
