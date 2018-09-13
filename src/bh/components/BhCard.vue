<template>
  <div
    :class="[
      'bh-card',
      !!shadow
        ? `bh-card--shaded-${shadow}`
        : 'bh-card--shaded'
  ]">
    <div class="bh-card__main">
      <slot />
    </div>
    <slot
      v-if="$slots.append"
      name="append"
      class="bh-card__append" />
  </div>
</template>

<script>
export default {
  name: 'BhCard',
  props: {
    shadow: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss">
@import '~bh/assets/scss/colors.scss';
@import '~bh/assets/scss/variables.scss';
@import '~bh/assets/scss/shadow.scss';


.bh {
  &-card {
    @include shadow();

    display: flex;
    flex-direction: row;
    background-color: white;
    border: 1px solid $color-lighter-grey;
    border-radius: $radius-normal;

    &__main {
      flex-grow: 1;
    }

    &__append {
      flex-grow: 0;
    }
  }
}
</style>
