<template>
  <bh-avatar :size="size">
    <img :src="`https://robohash.org/${profile.nickname}.png`">
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
