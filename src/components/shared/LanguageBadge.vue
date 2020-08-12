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

  .badge {
    border: 2px #2BBFAC solid !important;
    background-color: #2BBFAC;
    color: white;
    padding: 0.8rem 1rem;
  }

  .transparent {
    color: #2BBFAC !important;
    background-color: white !important;
  }

</style>
