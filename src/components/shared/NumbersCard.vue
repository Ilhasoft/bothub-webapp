<template>
  <b-tooltip
    :active="helpText && helpText.length > 0"
    :label="helpText"
    multilined
    type="is-dark"
    position="is-bottom">
    <div
      :class="{ 'number-card': true, 'number-card--clickable': clickable }"
      @click="onClick">
      <h1 :class="['has-text-centered', `number-card__title--size-${size}`]">{{ count }}</h1>
      <p :class="['has-text-centered', `number-card__subtitle--size-${size}`]">{{ label }} </p>
    </div>
  </b-tooltip>
</template>

<script>
export default {
  name: 'NumbersCard',
  props: {
    clickable: {
      type: Boolean,
      default: null,
    },
    count: {
      type: Number,
      default: 0,
    },
    label: {
      type: String,
      default: null,
    },
    helpText: {
      type: String,
      default: null,
    },
    size: {
      type: String,
      default: 'normal',
    },
  },
  methods: {
    onClick() {
      if (this.clickable) this.$emit('click');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';
@import '~@/assets/scss/variables.scss';

    .number-card {
        display: flex;
        flex-direction: column;
        justify-content: center;
        &--clickable {
            &:hover{
                cursor: pointer;
                color: $color-primary;
            }
        }

        &__title {
          &--size-normal {
            font-size: 2.938rem;
          }

         &--size-medium {
            font-size: 2.188rem;
          }
        }

        &__subtitle {
          &--size-normal {
            margin: 0.5rem 0;
          }

         &--size-medium {
            margin: 0.25rem 0;
          }
        }
    }

    h2 {
        color: $color-fake-black;
        font-weight: $font-weight-bolder;
        font-family: $font-family;
    }

    h1 {
        font-weight: $font-weight-bolder;
        font-family: $font-family;
        margin: 0;
    }

</style>
