export default {
  props: [
    {
      name: 'steps',
      type: 'Number',
      description: 'Define how many steps the component will take',
      default: '1',
    },
    {
      name: 'currentTab',
      type: 'Number',
      description: 'Set current step',
      default: '1',
    },
  ],
};
