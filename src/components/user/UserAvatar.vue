<template>
  <bh-avatar
    :size="size">
    <img
      v-if="profile.nickname"
      :class="size"
      :src="`https://robohash.org/${profile.nickname}`">
    <bh-icon
      v-else
      size="small"
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
};
</script>
