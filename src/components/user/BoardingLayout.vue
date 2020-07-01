<template>
  <div class="boarding">
    <div class="boarding__header">
      <img
        src="@/assets/imgs/logo-onboarding.svg"
        class="boarding__header__image"
        @click="goToLandingPage">
    </div>
    <div class="boarding__content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BoardingLayout',
  methods: {
    goToLandingPage() {
      this.$router.push({
        name: 'landingPage',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';
@import '~@/assets/scss/variables.scss';
@import '~@/assets/scss/colors.scss';

.boarding {

  &__content {
    background-color: $color-fake-white;
    min-height: 100vh;
    padding: 5.5rem 0 0 0;
  }

  &__header{
    box-shadow: inset 1px -3px 6px#0000001e;
    height: 5.5rem;
    width: 100%;
    background-color: $color-white;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 3px 6px #00000029;
    position: fixed;
    z-index: 999;
    top: 0;

    &__image{
      width: 12rem;
      height: 3.25rem;
      cursor: pointer;
    }
  }
}

</style>
