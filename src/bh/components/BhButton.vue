<template>
  <div class="bh-button">
    <button
      :disabled="disabled"
      :type="type"
      :class="classAttr"
      @click="$emit('click', $event)">
      <slot />
    </button>
    <bh-tooltip
      v-if="tooltipHover"
      class="bh-button__tooltip"
      open
      direction="down">
        <span v-if="(tooltipHover instanceof Array)">
          <div
            v-for="(text, i) in tooltipHover"
            :key="i">{{ text }}</div>
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
  },
  computed: {
    classAttr() {
      const classes = ['bh-button__button'];

      if (this.primary) {
        classes.push('bh-button__button--primary');
      }

      if (this.secondary) {
        classes.push('bh-button__button--secondary');
      }

      if (this.size) {
        classes.push(`bh-button__button--${this.size}`);
      }

      if (this.rounded) {
        classes.push('bh-button__button--rounded');
      }

      return classes;
    },
  },
};
</script>

<style lang="scss">
@import '~bh/assets/scss/forms.scss';


.bh {
  &-button {
    $parent: &;

    position: relative;

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
  }
}
</style>
