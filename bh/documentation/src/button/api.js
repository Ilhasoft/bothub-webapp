export default {
  props: [
    {
      name: 'disabled',
      type: 'Boolean',
      description: 'Disabled Button',
      required: true,
    },
    {
      name: 'primary',
      type: 'Boolean',
      description: 'Set primary style to button',
      default: 'null',
    },
    {
      name: 'inverted',
      type: 'Boolean',
      description: 'Reverse button color',
      default: 'null',
    },
    {
      name: 'transparent',
      type: 'Boolean',
      description: 'Set a transparent color for Button',
      default: 'false',
    },
    {
      name: 'secondary',
      type: 'Boolean',
      description: 'Set secondary style to Button',
      default: 'false',
    },
    {
      name: 'type',
      type: 'String',
      description: 'define the Type of Button',
      default: 'false',
    },
    {
      name: 'size',
      type: 'String',
      description: 'Set the size Button',
      default: 'false',
    },
    {
      name: 'rounded',
      type: 'Boolean',
      description: 'Set rounded borders to Button',
      default: 'false',
    },
    {
      name: 'tooltipHover',
      type: 'String, Array',
      description: 'Define tooltip text',
      default: 'false',
    },
    {
      name: 'fullWidth',
      type: 'Boolean',
      description: 'Force button occupy maximum space of parent element',
      default: 'false',
    },
  ],
  events: [
    {
      name: 'click',
      description: 'Emitted action when Button is clicked',
      parameters: 'Event',
    },
  ],
};
