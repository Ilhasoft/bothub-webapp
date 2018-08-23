<template>
  <div
    v-show="open"
    :tabindex="_uid"
    :class="{
      'bh-tooltip': true,
      'bh-tooltip--danger': danger,
      [`bh-tooltip--${direction}`]: !!direction,
    }"
    @click="close()"
    @blur="close()">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'BhTooltip',
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    danger: {
      type: Boolean,
      default: false,
    },
    direction: {
      type: String,
      default: null,
    },
  },
  watch: {
    open(value) {
      if (value) {
        this.$nextTick(() => {
          this.$el.focus();
        });
      }
    },
  },
  methods: {
    close() {
      this.$emit('update:open', false);
    },
  },
};
</script>

<style lang="scss">
@import '~bh/assets/scss/variables.scss';
@import '~bh/assets/scss/colors.scss';

@mixin down($size: 6px, $color: black) {
  border-top: $size solid $color;
  border-right: $size solid transparent;
  border-left: $size solid transparent;
}

@mixin up($size: 6px, $color: black) {
  border-right: $size solid transparent;
  border-bottom: $size solid $color;
  border-left: $size solid transparent;
}

.bh {
  &-tooltip {
    $parent: &;
    $background-color: black;

    z-index: $tooltip-z-index;
    display: block;
    padding: 8px 12px;
    color: white;
    background-color: $background-color;
    border-radius: 4px;
    outline: none;
    box-shadow: 0 0 16px -2px rgba(0, 0, 0, 1);

    &--down {
      &::before {
        @include down($color: $background-color);

        position: absolute;
        bottom: 0;
        left: 50%;
        width: 0;
        height: 0;
        content: '';
        transform: translate(-50%, 100%);
      }
    }

    &--up {
      &::before {
        @include up($color: $background-color);

        position: absolute;
        top: 0;
        left: 50%;
        width: 0;
        height: 0;
        content: '';
        transform: translate(-50%, -100%);
      }
    }

    &--danger {
      background-color: $color-danger;

      &#{$parent}--down {
        &::before {
          @include down($color: $color-danger);
        }
      }

      &#{$parent}--up {
        &::before {
          @include up($color: $color-danger);
        }
      }
    }
  }
}
</style>
