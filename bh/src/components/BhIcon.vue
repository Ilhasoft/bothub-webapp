<template>
  <span
    :class="{
      'bh-icon': true,
      [`bh-icon--${size}`]: !!size,
    }"
    @click="$emit('click', $event)"
    v-html="svg"
  />
</template>

<script>
import { icons } from '../utils';


export default {
  name: 'BhIcon',
  props: {
    value: {
      type: String,
      default: 'help-text',
    },
    size: {
      type: String,
      default: null,
    },
  },
  computed: {
    svg() {
      return icons[this.value];
    },
  },
};
</script>

<style lang="scss">
@import '@scss/variables.scss';


.bh {
  &-icon {
    display: inline-block;
    width: 1.25em;
    height: 1.25em;
    vertical-align: text-top;

    svg {
      display: block;
      width: 100%;
      max-width: 100%;
      height: 100%;
      max-height: 100%;
      fill: currentColor;
    }

    @each $size in $sizes {
      $size-name: nth($size, 1);
      $size-value: nth($size, 2);

      &--#{$size-name} {
        width: $size-value;
        height: $size-value;
      }
    }
  }
}
</style>
