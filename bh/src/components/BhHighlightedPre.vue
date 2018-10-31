<template>
  <pre
    v-highlightjs="code"
    class="bh-highlighted-pre"
  ><code :class="codeClass" /></pre>
</template>

<script>
export default {
  name: 'BhHighlightedPre',
  props: {
    code: {
      type: String,
      required: true,
    },
    codeClass: {
      type: String,
      default: 'html',
    },
  },
};
</script>

<style lang="scss">
.bh {
  &-highlighted-pre {
    code {
      padding: 1rem;
    }
  }
}
</style>
