<template>
  <bh-avatar
    :size="size">
    <img
      :class="size"
      :src="`https://robohash.org/${profile.nickname}`">
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
};
</script>
