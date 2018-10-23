export default {
  props: [
    {
      name: 'open',
      type: 'Boolean',
      description: 'Control tooltip is open or close',
      required: false,
      default: 'false',
    },
    {
      name: 'danger',
      type: 'Boolean',
      description: 'Set danger Class',
      required: false,
      default: 'false',
    },
    {
      name: 'direction',
      type: 'String',
      description: 'Set the Up or Down direction to controll the direction show of tooltip',
      required: false,
      default: 'false',
    },
  ],
};
