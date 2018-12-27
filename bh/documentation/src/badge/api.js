export default {
  props: [
    {
      name: 'size',
      type: 'String',
      description: 'Set size of Badge area',
      default: 'null',
    },
    {
      name: 'color',
      type: 'String',
      description: 'Set a color to Badge',
      default: 'null',
    },
    {
      name: 'transparent',
      type: 'Boolean',
      description: 'Apply transparent style: transparent background and border color is color '
                   + 'prop value',
      default: 'true',
    },
  ],
};
