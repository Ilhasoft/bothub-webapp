<template>
  <div class="boarding">
    <div class="boarding__header">
      <img
        src="@/assets/imgs/logo-onboarding.svg"
        class="boarding__header__image"
        @click="goToLandingPage">
    </div>
  </div>
</template>

<script>
export default {
  name: 'BoardingHeader',
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

.boarding{

  &__header{
    box-shadow: 0px 3px 6px#00000029;
    height: 5.5rem;
    width: 100%;
    background-color: $color-white;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    width: 100%;
    z-index: 1;

    &__image{
      width: 12rem;
      height: 3.25rem;
      cursor: pointer;
    }
  }
}

</style>
