import { ROLES } from '.';


export default (Vue) => {
  /* istanbul ignore next */
  Vue.filter('percent', value => `${(value * 100).toFixed(1)}%`);

  /* istanbul ignore next */
  Vue.filter('roleVerbose', role => ROLES[role]);

  /* istanbul ignore next */
  Vue.filter('can_t', value => (value ? 'can' : 'can\'t'));

  /* istanbul ignore next */
  Vue.filter('statusCodeVerbose', e => ({
    400: 'Sorry, something was not found',
  }[e]));
};
