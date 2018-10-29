<template>
  <div
    :class="{
      'bh-button__wrapper': true,
      'bh-button__wrapper--full-width': fullWidth,
    }"
  >
    <button
      :disabled="disabled"
      :type="type"
      :class="{
        'bh-button__wrapper__button': true,
        'bh-button': true,
        [`bh-button--${size}`]: !!size,
        [`bh-button--${currentColor}`]: currentColor && !inverted && !transparent,
        [`bh-button--${currentColor}-inverted`]: currentColor && inverted && !transparent,
        [`bh-button--${currentColor}-transparent`]: currentColor && !inverted && transparent,
        'bh-button--rounded': rounded,
      }"
      @click="$emit('click', $event)"
    >
      <bh-icon
        v-if="loading"
        spin
        value="refresh"
      />
      <slot />
    </button>
    <bh-tooltip
      v-if="tooltipHover"
      class="bh-button__wrapper__tooltip"
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
    size: {
      type: String,
      default: null,
    },
    primary: {
      type: Boolean,
      default: false,
    },
    secondary: {
      type: Boolean,
      default: false,
    },
    color: {
      type: [String, Boolean],
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
    type: {
      type: String,
      default: 'button',
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
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    currentColor() {
      return this.color
        || (this.primary && 'primary')
        || (this.secondary && 'secondary')
        || false;
    },
  },
};
</script>

<style lang="scss">
.bh {
  &-button {
    &__wrapper {
      $parent: &;

      position: relative;
      display: inline-block;

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

        #{$parent}__button {
          display: block;
          width: 100%;
        }
      }
    }
  }
}
</style>
