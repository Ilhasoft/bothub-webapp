<template>
  <span
    :class="{
      'bh-icon': true,
      [`bh-icon--${size}`]: !!size,
      'bh-icon--spin': spin,
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
    spin: {
      type: Boolean,
      default: false,
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


@keyframes BhIconSpin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.bh {
  &-icon {
    display: inline-block;
    width: 1em;
    height: 1em;
    vertical-align: text-top;

    svg {
      display: block;
      width: 125%;
      max-width: 125%;
      height: 125%;
      max-height: 125%;
      margin: -12.5%;
      fill: currentColor;
    }

    &--spin {
      svg {
        animation-name: BhIconSpin;
        animation-duration: 1s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
      }
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
