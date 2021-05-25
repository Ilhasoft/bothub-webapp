<template>
  <div class="loading">
    <img
      src="../../assets/icons/logo-animated-circle-reduced.svg"
      :class="{
        'loading__icon': true,
        'loading__icon--hasCleanestColor': hasCleanestColor
      }"
    />
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    hasCleanestColor: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/utilities.scss";
@import "~@weni/unnnic-system/src/assets/scss/unnnic.scss";

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  &__icon {
    width: $unnnic-spacing-stack-xgiant;

    &--hasCleanestColor {
      filter: brightness(40%) contrast(100%) saturate(100%) invert(100%) sepia(35%)
        hue-rotate(200deg);
    }
  }
}
</style>
