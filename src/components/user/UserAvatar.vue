<template>
  <bh-avatar
    :size="size">
    <img
      :class="reducedSize"
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
