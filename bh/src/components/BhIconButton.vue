<template>
  <button
    :disabled="disabled"
    :type="type"
    :class="{
      'bh-icon-button': true,
      'bh-icon-button--primary': primary && !inverted,
      'bh-icon-button--primary-inverted': primary && inverted,
      [`bh-icon-button--${size}`]: !!size

    }"
    @click="$emit('click', $event)"
    v-html="svg"
  />
</template>

<script>
import { icons } from '../utils';


export default {
  name: 'BhIconButton',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    primary: {
      type: Boolean,
      default: false,
    },
    inverted: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'button',
    },
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
@import '@scss/forms.scss';
@import '@scss/variables.scss';
@import '@scss/colors.scss';

.bh {
  &-icon-button {
    @include form-component-sizes();

    display: block;
    width: $form-component-height-normal;
    padding: 0;
    margin: 0;
    cursor: pointer;
    background: none;
    border: none;
    outline: none;

    &--small {
      width: $form-component-height-small;
    }

    &--medium {
      width: $form-component-height-medium;
    }

    &--large {
      width: $form-component-height-large;
    }

    &--primary {
      color: $color-primary;
    }

    &--primary-inverted {
      color: $color-primary-inverted;
    }

    svg {
      display: block;
      width: 100%;
      max-width: 100%;
      height: 100%;
      max-height: 100%;
      fill: currentColor;
    }
  }
}
</style>
