<template>
  <div :class="classAttr">
    <slot />
    <div
      v-if="hasError"
      class="bh-input__errors">
      <div
        v-for="(error, i) in this.bhField.errors"
        :key="i"
        class="bh-input__errors__item">
        <span>-</span>
        <span>{{ error }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BhInput',
  inject: ['bhField'],
  computed: {
    hasError() {
      return this.bhField.errors.length > 0;
    },
    classAttr() {
      const classes = ['bh-input'];

      if (this.hasError) {
        classes.push('bh-input--has-error');
      }

      return classes;
    },
  },
};
</script>

<style lang="scss">
@import '~bh/assets/scss/colors.scss';

.bh {
  &-input {
    position: relative;

    &__errors {
      margin: 4px 0;

      &__item {
        display: flex;
        font-size: .75rem;
        color: $color-danger;

        :first-child {
          margin-right: 8px;
        }
      }
    }
  }
}
</style>
