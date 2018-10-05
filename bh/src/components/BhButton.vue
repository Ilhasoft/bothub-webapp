<template>
  <div
    :class="{
      'bh-button': true,
      'bh-button--full-width': fullWidth,
    }"
  >
    <button
      :disabled="disabled"
      :type="type"
      :class="{
        'bh-button__button':true,
        'bh-button__button--primary': primary && !inverted && !transparent,
        'bh-button__button--primary-inverted': primary && inverted && !transparent,
        'bh-button__button--primary-transparent': primary && !inverted && transparent,
        'bh-button__button--primary-inverted-transparent': primary && inverted && transparent,
        'bh-button__button--secondary': secondary,
        [`bh-button__button--${size}`]: !!size,
        'bh-button__button--rounded': rounded,
        'bh-button__button--full-width': fullWidth,
      }"
      @click="$emit('click', $event)"
    >
      <slot />
    </button>
    <bh-tooltip
      v-if="tooltipHover"
      class="bh-button__tooltip"
      open
      direction="down"
    >
      <span v-if="(tooltipHover instanceof Array)">
        <div
          v-for="(text, i) in tooltipHover"
          :key="i"
        >{{ text }}</div>
      </span>
      <span v-else>{{ tooltipHover }}</span>
    </bh-tooltip>
  </div>
</template>

<script>
export default {
  name: 'BhButton',
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
    transparent: {
      type: Boolean,
      default: false,
    },
    secondary: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'button',
    },
    size: {
      type: String,
      default: null,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    tooltipHover: {
      type: [String, Array],
      default: null,
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
@import '@scss/forms.scss';


.bh {
  &-button {
    $parent: &;

    position: relative;
    display: inline-block;

    &__button {
      @include button();
    }

    &__tooltip {
      position: absolute;
      top: 0;
      left: 50%;
      display: none;
      width: max-content;
      transform: translate(-50%, calc(-100% - 8px));
    }

    &:hover {
      #{$parent}__tooltip {
        display: block;
      }
    }

    &--full-width {
      display: block;
      width: 100%;
    }
  }
}
</style>
