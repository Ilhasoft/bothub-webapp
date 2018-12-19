<template>
  <bh-badge
    :transparent="!main"
    :size="size"
    color="primary">{{ language }}</bh-badge>
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
    size: {
      type: String,
      default: 'small',
    },
  },
};
</script>
