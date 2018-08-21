<template>
  <span
    :class="{
      'bh-icon': true,
      [`bh-icon--${size}`]: !!size,
    }"
    @click="$emit('click', $event)"
    v-html="svg" />
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
.bh {
  &-icon {
    display: inline-block;
    width: 1.25rem;
    height: 1.25rem;
    padding: 0 !important;
    vertical-align: text-top;

    svg {
      display: block;
      width: 100%;
      max-width: 100%;
      height: 100%;
      max-height: 100%;
      fill: currentColor;
    }

    &--small {
      width: 1rem;
      height: 1rem;
    }

    &--medium {
      width: 1.5rem;
      height: 1.5rem;
    }

    &--large {
      width: 1.75rem;
      height: 1.75rem;
    }
  }
}
</style>
