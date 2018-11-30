export default {
  props: [
    {
      name: 'shadow',
      type: 'String',
      description: 'Set Shadow to envolve Card',
      required: false,
      default: 'null',
    },
    {
      name: 'Slot',
      description: 'Set the content of Card',
      default: 'null',
    },
    {
      name: 'no-border',
      type: 'boolean',
      description: 'Add and Remove border to card',
      default: 'false',
    },
  ],
};
