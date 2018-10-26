<template>
  <div
    :class="{
      'bh-badge': true,
      [`bh-badge--${size}`]: !!size,
      [`bh-badge--color-${color}`]: !!color
    }"
    @click="$emit('click', $event)"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'BhBadge',
  props: {
    size: {
      type: String,
      default: null,
    },
    color: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss">
@import '@scss/variables.scss';
@import '@scss/colors.scss';


.bh {
  &-badge {
    display: inline-flex;
    height: $size-normal;
    padding: 0 1rem;
    font-size: 1rem;
    line-height: $size-normal;
    border-radius: ($size-normal / 2);

    &--small {
      height: $size-small;
      padding: 0 .75rem;
      font-size: .75rem;
      line-height: $size-small;
      border-radius: ($size-small / 2);
    }

    &--medium {
      height: $size-medium;
      padding: 0 1.25rem;
      font-size: 1.25rem;
      line-height: $size-medium;
      border-radius: ($size-medium / 2);
    }

    &--large {
      height: $size-large;
      padding: 0 1.5rem;
      font-size: 1.5rem;
      line-height: $size-large;
      border-radius: ($size-large / 2);
    }

    @each $color in $colors {
      $color-name: nth($color, 1);
      $color-value: nth($color, 2);
      $color-inverted: nth($color, 3);

      &--#{$color-name} {
        color: $color-inverted;
        background-color: $color-value;
      }
    }

    > * {
      margin-right: 8px;

      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
