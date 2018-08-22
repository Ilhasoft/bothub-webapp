<template>
  <bh-avatar :size="size">
    <bh-icon
      :size="size"
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
      default: null,
    },
  },
};
</script>
