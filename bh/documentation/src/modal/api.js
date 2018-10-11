export default {
  props: [
    {
      name: 'open',
      type: 'Boolean',
      description: 'Controll if modal is open or close',
      required: false,
      default: 'false',
    },
    {
      name: 'backgroundCloses',
      type: 'Boolean',
      description: 'If clicked out of modal set event to close it',
      required: false,
      default: 'true',
    },
  ],
  events: [
    {
      name: 'selected',
      description: 'Emitted when item is selected.',
      parameters: 'Value or item selected',
    },
  ],
};
