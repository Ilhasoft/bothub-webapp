export default {
  props: [
    {
      name: 'value',
      type: 'String',
      description: 'Set the Text input Value',
      default: '',
    },
    {
      name: 'size',
      type: 'String',
      description: 'Set the size of Text Input',
      default: 'null',
    },
    {
      name: 'prependText',
      type: 'String',
      description: 'Set the preced text of input area',
      default: 'null',
    },
    {
      name: 'formatters',
      type: 'Array',
      description: 'Apply formater for input value',
      default: '[]',
    },
  ],
};
