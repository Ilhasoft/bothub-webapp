<template>
  <div class="bh-stepper">
    <span
      v-for="value in steps"
      :key="value"
      :class="{
        'bh-stepper__step--active': currentStep === value,
        'bh-stepper__step': true,
      }"
    />
  </div>
</template>

<script>
export default {
  name: 'BhStepper',
  props: {
    steps: {
      type: Number,
      default: 1,
    },
    currentStep: {
      type: Number,
      default: 1,
    },
  },
};
</script>

<style lang="scss">
@import '@scss/forms.scss';


.bh {
  &-stepper {
    display: inline-block;
    margin-top: .5rem;

    &__step {
      display: inline-block;
      width: 1rem;
      height: 1rem;
      margin: 1rem;
      background-color: #bbbbbb;
      border: none;
      border-radius: 50%;
      opacity: 0.5;

      &--active {
        background-color: $color-primary;
        opacity: 1;
        animation-name: floating;
        animation-duration: 1s;
        animation-timing-function: ease-in-out;
        animation-iteration-count: infinite;
        @keyframes floating {
          0% { transform: translate(0, 0px); }
          65%  { transform: translate(0, -5px); }
          100%   { transform: translate(0, 0px); }
        }
      }
    }
  }
}
</style>
