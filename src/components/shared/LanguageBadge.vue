<template>
  <b-tag
    :class="{ badge: true, transparent: !main }"
    rounded>{{ language }}</b-tag>
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
    border: 2px $color-primary solid !important;
    color: $color-white;
    background-color: $color-primary !important;
    padding: 0.8rem 1rem;
  }

  .transparent {
    color: $color-primary !important;
    background-color: transparent !important;
  }

</style>
