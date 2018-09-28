<template>
  <div :class="classAttr">
    <slot />
    <div
      v-if="hasError"
      class="bh-input__errors"
    >
      <div
        v-for="(error, i) in errors"
        :key="i"
        class="bh-input__errors__item"
      >
        <span>-</span>
        <div v-if="(error instanceof Object)">
          <div
            v-for="(value, key) in error"
            :key="key"
          >{{ key }}: {{ value }}</div>
        </div>
        <span v-else>{{ error }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BhInput',
  inject: {
    bhField: {
      default: null,
    },
  },
  computed: {
    hasError() {
      return this.errors.length > 0;
    },
    errors() {
      if (!this.bhField) {
        return [];
      }
      return this.bhField.errors;
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
@import '@scss/colors.scss';

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
