<template>
  <div :class="inputClassAttr">
    <select
      :class="`${className}`"
    >
      <slot />
    </select>
  </div>
</template>

<script>
import BhText from './BhText';


export default {
  name: 'BhSelect',
  extends: BhText,
  props: {
    value: {
      type: [String, Number, Boolean, Object, Array, Symbol, Function],
      default: null,
    },
  },
  data() {
    return {
      selected: null,
      className: 'bh-select',
    };
  },
};
</script>

<style lang="scss">
@import '@scss/colors.scss';
@import '@scss/variables.scss';
@import '@scss/forms.scss';

.bh {
  &-select {
    @include text();
  }
  &-select:focus {
    outline: 3px solid $color-primary
  }
}
</style>
