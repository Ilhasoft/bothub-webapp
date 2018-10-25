<template>
  <button
    :class="{
      'bh-avatar': true,
      [`bh-avatar--${size}`]: !!size,
    }"
    @click="$emit('click', $event)"
  >
    <div class="bh-avatar__content"><slot /></div>
  </button>
</template>

<script>
export default {
  name: 'BhAvatar',
  props: {
    size: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@scss/variables.scss';
@import '@scss/colors.scss';


.bh {
  &-avatar {
    position: relative;
    width: $size-normal;
    height: $size-normal;
    color: $color-bolder-grey;
    cursor: pointer;
    background-color: $color-white-fake;
    border-color: transparent;
    border-radius: 50%;
    outline: none;

    @each $size in $sizes {
      $size-name: nth($size, 1);
      $size-value: nth($size, 2);

      &--#{$size-name} {
        width: $size-value;
        height: $size-value;
      }
    }

    &__content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
