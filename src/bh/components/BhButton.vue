<template>
  <button
    :type="type"
    :class="classAttr">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'BhButton',
  props: {
    type: {
      type: String,
      default: 'submit',
    },
    size: {
      type: String,
      default: null,
    },
  },
  computed: {
    classAttr() {
      const classes = ['bh-button'];

      if (this.size) {
        classes.push(`bh-button-${this.size}`);
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
