<template>
  <b-tag
    :class="{ badge: true, transparent: !main }"
    rounded
    color="primary">{{ language }}</b-tag>
</template>

<script>
export default {
  name: 'LanguageBadge',
  props: {
    language: {
      type: String,
      required: true,
    },
    main: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>

@import '~@/assets/scss/colors.scss';

  .badge {
    border: 2px $color-primary-dark solid !important;
    background-color: $color-primary-dark;
    color: $color-white;
    padding: 0.8rem 1rem;
  }

  .transparent {
    color: $color-primary-dark !important;
    background-color: $color-white !important;
  }

</style>
