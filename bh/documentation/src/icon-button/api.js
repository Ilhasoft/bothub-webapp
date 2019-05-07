export default {
  props: [
    {
      name: 'disabled',
      type: 'Boolean',
      description: 'Disabled Button',
      default: false,
      required: true,
    },
    {
      name: 'primary',
      type: 'Boolean',
      description: 'Set the primary collor for Icon Button',
      default: false,
    },
    {
      name: 'inverted',
      type: 'Boolean',
      description: 'Invert button colors',
      default: false,
    },
    {
      name: 'type',
      type: 'String',
      description: 'Set type of button',
      default: false,
    },
    {
      name: 'value',
      type: 'String',
      description: 'Set the icon value for button',
      default: false,
    },
    {
      name: 'size',
      type: 'String',
      description: 'Set the icon Button Size',
      default: false,
    },
  ],
};
