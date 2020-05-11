/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable prefer-rest-params */
/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */

export default {
  addHotjar() {
    if (process.env.BOTHUB_WEBAPP_USE_HOTJAR && process.env.BOTHUB_WEBAPP_HOTJAR_ID) {
      (function (h, o, t, j, a, r) {
        h.hj = h.hj || function () { (h.hj.q = h.hj.q || []).push(arguments); };
        h._hjSettings = { hjid: process.env.BOTHUB_WEBAPP_HOTJAR_ID, hjsv: 6 };
        a = o.getElementsByTagName('head')[0];
        r = o.createElement('script'); r.async = 1;
        r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
        a.appendChild(r);
      }(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv='));
    }
  },
};
