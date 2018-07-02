<template>
  <button
    type="button"
    class="avatar">
    <b-icon
      icon="account"
      class="avatar-icon" />
  </button>
</template>

<script>
export default {
  name: 'UserAvatar',
  props: {
    profile: {
      required: true,
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/utilities.scss';

.avatar {
  $size: 36px;

  position: relative;
  width: $size;
  height: $size;
  overflow: hidden;
  border-radius: 100%;
  border: 2px solid #fff;
  background-color: $white-ter;
  outline: none;
  cursor: pointer;

  &-icon {
    position: absolute;
    left: 50%;
    height: 50%;
    transform: translate(-50%, -50%);
    color: $grey-light;
  }
}
</style>
