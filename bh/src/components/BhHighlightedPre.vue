<template>
  <div
    v-highlightjs="finalCode"
    class="bh-highlighted-pre"
  ><code :class="codeClass" /></div>
</template>

<script>
export default {
  name: 'BhHighlightedPre',
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
.bh {
  &-highlighted-pre {
    white-space: pre-wrap;

    code {
      padding: 1rem;
    }
  }
}
</style>
