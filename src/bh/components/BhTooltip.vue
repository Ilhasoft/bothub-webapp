<template>
  <div
    v-show="open"
    :tabindex="_uid"
    @click="close()"
    @blur="close()"
    :class="classAttr">
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
  computed: {
    classAttr() {
      const classes = ['bh-tooltip'];

      if (this.direction) {
        classes.push(`bh-tooltip--${this.direction}`);
      }

      return classes;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~bh/assets/scss/variables.scss';
@import '~bh/assets/scss/typography.scss';

.bh {
  &-tooltip {
    @include typography();

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
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 0;
        height: 0;
        content: '';
        border-top: 6px solid $background-color;
        border-right: 6px solid transparent;
        border-left: 6px solid transparent;
        transform: translate(-50%, 100%);
      }
    }
  }
}
</style>
