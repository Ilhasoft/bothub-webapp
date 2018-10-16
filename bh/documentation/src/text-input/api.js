export default {
  props: [
    {
      name: 'data',
      type: 'Array',
      description: 'List of items',
      required: true,
    },
    {
      name: 'verbose-field',
      type: 'String',
      description: 'If items are objects use this prop to set key with printable value.',
      default: 'null',
    },
    {
      name: 'index-field',
      type: 'String',
      description: 'If items are objects use this prop to set key with index value.',
      default: 'null',
    },
    {
      name: 'force-select-first',
      type: 'Boolean',
      description: 'Forces user select first element from search or list.',
      default: 'false',
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
