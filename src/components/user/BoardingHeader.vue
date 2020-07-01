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
    box-shadow: inset 1px -3px 6px#0000001e;
    height: 5.5rem;
    width: 100%;
    background-color: $color-white;
    display: flex;
    justify-content: center;
    align-items: center;

    &__image{
      width: 12rem;
      height: 3.25rem;
      cursor: pointer;
    }
  }
}

</style>
