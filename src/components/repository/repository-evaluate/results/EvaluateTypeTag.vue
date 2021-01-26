<template>
  <b-tag
    :type="evaluateType === 'Manual' ? 'is-warning' : 'is-info'"
    class="evaluate-type"
    rounded>
    <p>{{ evaluateType }}</p>
  </b-tag>
</template>

<script>

export default {
  name: 'EvaluateTypeTag',
  props: {
    evaluateType: {
      type: String,
      default: '',
    },
  },
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
