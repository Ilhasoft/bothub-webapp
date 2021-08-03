<template>
  <div class="loading">
    <img
      src="~@/assets/icons/logo-animated-circle-reduced-clearnest.svg"
      class="loading__icon"
    />
  </div>
</template>

<script>
export default {
  name: 'Loading',
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/utilities.scss";
@import "~@weni/unnnic-system/src/assets/scss/unnnic.scss";

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20rem;
  width: 100%;
  &__icon {
    width: $unnnic-spacing-stack-xgiant;
  }
}
</style>
