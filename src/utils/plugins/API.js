import api from '@/api/v2';


export default {
  install: (Vue) => {
    /* eslint-disable no-param-reassign */
    Vue.prototype.$api = api;
    /* eslint-enable */
  },
};
