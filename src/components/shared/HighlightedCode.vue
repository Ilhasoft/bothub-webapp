<template>
  <pre
    v-highlightjs="finalCode"
    class="highlighted-pre"
  ><code :class="codeClass" /></pre>
</template>

<script>
export default {
  name: 'HighlightedCode',
  props: {
    code: {
      type: String,
      default: null,
    },
    codeClass: {
      type: String,
      default: 'html',
    },
  },
  computed: {
    finalCode() {
      return this.code || (
        this.$slots.default
        && this.$slots.default[0]
        && this.$slots.default[0].text
      );
    },
  },
};
</script>

<style lang="scss">
  .highlighted-pre {
    white-space: pre-wrap;
    min-height: 90px;

    code {
      padding: 1rem;
    }
}
</style>
