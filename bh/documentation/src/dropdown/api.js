export default {
  props: [
    {
      name: 'position',
      type: 'String',
      description: 'Set the drowpdown action side',
      default: 'null',
      required: false,
    },
    {
      name: 'title',
      type: 'String',
      description: 'Set the title to show on dropdown',
      default: 'null',
      required: false,
    },
    {
      name: 'full-width',
      type: 'Boolean',
      description: 'Set behaviour for dropdown content size',
      default: 'false',
      required: false,
    },
  ],
};
