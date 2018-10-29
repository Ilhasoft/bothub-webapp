<template>
  <div class="bh-select">
    <select
      :disabled="disabled"
      :class="{
        'bh-select': true,
        'bh-select__disabled': disabled,
      }"
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
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selected: null,
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

    width: 100%;

    &__disabled {
      cursor: no-drop;
    }
  }

  &-select:focus {
    outline: 2px solid $color-primary;
  }
}
</style>
