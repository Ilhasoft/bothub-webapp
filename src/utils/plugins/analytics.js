/* eslint-disable no-console */
/* eslint-disable no-undef */
export default {
  send({ category, event }) {
    if (!ga) return;
    ga('send', {
      hitType: 'event',
      eventCategory: category,
      eventAction: event,
      eventLabel: 'Interaction',
    });
  },
};
