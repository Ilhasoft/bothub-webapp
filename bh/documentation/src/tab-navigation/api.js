export default {
  props: [
    {
      name: 'value',
      type: 'String',
      description: 'Set the tabs navigation control',
      default: 'null',
    },
    {
      name: 'animated',
      type: 'Boolean',
      description: 'Make animation when tab is changed',
      default: 'true',
    },
    {
      name: 'label',
      type: 'String',
      description: 'Set a name for the tab item',
      default: 'null',
    },
  ],
};
