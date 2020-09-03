<template>
  <b-tag
    :class="!isPendingExample ? { badge: true, transparent: !main } : 'pendingBadge'"
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
    isPendingExample: {
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

  .pendingBadge {
    padding: 0.8rem 1rem;
    border: 2px $color-primary solid !important;
    color: $color-primary !important;
  }

  .transparent {
    color: $color-primary !important;
    background-color: $color-white !important;
  }

</style>
