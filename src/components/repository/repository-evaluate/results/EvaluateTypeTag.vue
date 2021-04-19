<template>
  <b-tag
    :type="evaluateType ? 'is-info' : 'is-warning'"
    class="evaluate-type"
    rounded>
    <p>{{ checkEvaluateType }}</p>
  </b-tag>
</template>

<script>

export default {
  name: 'EvaluateTypeTag',
  props: {
    evaluateType: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    checkEvaluateType() {
      if (this.evaluateType) return this.$t('webapp.result.result_automatic')
      return this.$t('webapp.result.result_manual')
    }
  }
};
</script>

<style lang="scss" scoped>

.evaluate-type{
    height: 1.849rem;
    width: 5.5rem;

    p {
        font-size: 0.75rem;
    }
}

</style>
