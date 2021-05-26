<template>
  <div class="loading">
    <img
      src="~@/assets/icons/logo-animated-circle-reduced-clearnest.svg"
      class="loading__icon"
      v-if="hasCleanestColor"
    />
    <img src="~@/assets/icons/logo-animated-circle-reduced.svg"
    class="loading__icon" v-else />
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
  },
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
  }
}
</style>
