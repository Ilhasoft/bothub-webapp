<template>
  <bh-avatar :size="size">
    <bh-icon
      :size="reducedSize"
      value="account" />
  </bh-avatar>
</template>

<script>
export default {
  name: 'UserAvatar',
  props: {
    profile: {
      required: true,
      type: Object,
    },
    size: {
      type: String,
      default: 'normal',
    },
  },
  computed: {
    reducedSize() {
      return ({
        small: 'small',
        normal: 'small',
        medium: 'normal',
        large: 'medium',
      })[this.size];
    },
  },
};
</script>
