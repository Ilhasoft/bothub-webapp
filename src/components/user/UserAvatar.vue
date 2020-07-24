<template>
  <div
    :class="{
      'avatar': true,
      [`avatar--${size}`]: !!size,
      'avatar--clickable': clickable,
    }"
    @click="$emit('click', $event)"
  >
    <div
      :class="{avatar__content: true,
               [`avatar--${size}`]: !!size}">
      <img
        v-if="!isOrganization && profile.nickname"
        :class="size"
        :src="`https://robohash.org/${profile.nickname}`">
      <div
        v-else
        class="avatar__icon">
        <b-icon
          :icon="isOrganization ? 'account-multiple' : 'account'"
          size="small" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserAvatar',
  props: {
    profile: {
      required: true,
      type: Object,
    },
    isOrganization: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'normal',
    },
    clickable: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/variables.scss';
@import '~@/assets/scss/colors.scss';

  .avatar {
    position: relative;
    width: $size-normal;
    height: $size-normal;
    overflow: hidden;
    color: $color-fake-black;
    background-color: $color-fake-white;
    border-color: transparent;
    border-radius: 50%;
    outline: none;
    display: inline-block;

    @each $size in $sizes {
      $size-name: nth($size, 1);
      $size-value: nth($size, 2);

      &--#{$size-name} {
        width: $size-value;
        height: $size-value;
      }

      &--full {
        width: 100%;
        height: 100%;
      }
    }

    &__icon {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &--clickable {
      cursor: pointer;
    }

    &__content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>
