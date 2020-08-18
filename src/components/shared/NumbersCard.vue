<template>
  <b-tooltip
    :active="helpText"
    :label="helpText"
    multilined
    type="is-dark"
    position="is-bottom">
    <div
      :class="{ 'number-card': true, 'number-card--clickable': clickable }"
      @click="onClick">
      <h1 class="has-text-centered">{{ count }}</h1>
      <p class="has-text-centered">{{ label }} </p>
    </div>
  </b-tooltip>
</template>

<script>
export default {
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
  },
  methods: {
    onClick() {
      this.$emit('click');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';
@import '~@/assets/scss/variables.scss';

    .number-card {
        &--clickable {
            &:hover{
                cursor: pointer;
                color: $color-primary;
            }
        }
    }

    h2 {
        color: $color-fake-black;
        font-weight: $font-weight-bolder;
        font-family: $font-family;
    }

    h1 {
        font-size: 47px;
        font-weight: $font-weight-bolder;
        font-family: $font-family;
        margin:0;
    }

</style>
