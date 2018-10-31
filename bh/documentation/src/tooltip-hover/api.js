export default {
  props: [
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
      description: 'Set the "up" or "down" direction to controll the direction show of tooltip',
      required: false,
      default: 'down',
    },
  ],
};
