<template>
  <div
    v-show="open"
    :tabindex="_uid"
    @click="close()"
    @blur="close()"
    class="bh-tooltip">
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

<style lang="scss" scoped>
@import '~bh/assets/scss/variables.scss';

.bh {
  &-tooltip {
    z-index: $tooltip-z-index;
    display: block;
    padding: 8px 12px;
    color: white;
    background-color: black;
    border-radius: 4px;
    outline: none;
    box-shadow: 0 0 16px -2px rgba(0, 0, 0, 1);
  }
}
</style>
