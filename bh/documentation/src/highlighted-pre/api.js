export default {
  props: [
    {
      name: 'code',
      type: 'String',
      description: 'Text code.',
      required: true,
    },
    {
      name: 'codeClass',
      type: 'String',
      description: 'Code language/formatation.',
      required: false,
      default: 'html',
    },
  ],
};
