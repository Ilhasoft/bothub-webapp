<template>
  <button
    :disabled="disabled"
    :type="type"
    :class="classAttr">
    <slot />
  </button>
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
    type: {
      type: String,
      default: 'submit',
    },
    size: {
      type: String,
      default: null,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classAttr() {
      const classes = ['bh-button'];

      if (this.primary) {
        classes.push('bh-button-primary');
      }

      if (this.size) {
        classes.push(`bh-button-${this.size}`);
      }

      if (this.rounded) {
        classes.push('bh-button-rounded');
      }

      return classes.join(' ');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~bh/assets/scss/forms.scss';

.bh {
  &-button {
    @include button();
  }
}
</style>
