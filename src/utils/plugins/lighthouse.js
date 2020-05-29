/* eslint-disable global-require */
/* eslint-disable func-names */
export default {
  addLighthouse() {
    if (window.hdlh || !process.env.BOTHUB_WEBAPP_LIGHTHOUSE_KEY) return;
    const img = require('../../assets/imgs/mascot.svg');
    window.hdlh = {
      widget_key: process.env.BOTHUB_WEBAPP_LIGHTHOUSE_KEY,
      primary_color: '#2BBFAC',
      color_mode: 'dark',
      logo: img,
      brand: 'BotHub',
      disable_contact_button: true,
      onLoad: () => { window.Lighthouse.hideButton(); },
      onHide: () => { window.Lighthouse.hideButton(); },
      onShow: () => { window.Lighthouse.showButton(); },
      position: 'bottom left',
    };
    (function (h, d) { const s = d.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = `${h}?t=${new Date().getTime()}`; d.head.appendChild(s); }('https://lighthouse.helpdocs.io/load', document));
  },

  setPanelHidden(hidden) {
    if (!window.Lighthouse) return;

    if (hidden) {
      window.Lighthouse.hide();
    } else {
      window.Lighthouse.show();
    }
  },

  navigateToArticle(id) {
    if (!window.Lighthouse || !id) return;
    window.Lighthouse.navigate('article', id);
  },
};
