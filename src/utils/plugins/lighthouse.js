/* eslint-disable func-names */
export default {
  addLighthouse() {
    if (!process.env.BOTHUB_WEBAPP_LIGHTHOUSE_KEY) return;
    window.hdlh = {
      widget_key: process.env.BOTHUB_WEBAPP_LIGHTHOUSE_KEY,
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
};
