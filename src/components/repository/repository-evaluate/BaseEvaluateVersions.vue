<template>
  <div class="base-evaluate-versions">
    <evaluate-version-list :crossValidation="crossValidationType"/>
  </div>
</template>

<script>
import EvaluateVersionList from '@/components/repository/repository-evaluate/versions/EvaluateVersionList';

export default {
  name: 'BaseEvaluateVersions',
  components: {
    EvaluateVersionList,
  },
  props: {
    repository: {
      type: Object,
      required: true,
    },
    crossValidationType: {
      type: Boolean,
      default: null,
    }
  },
};
</script>

<style lang="scss" scoped>

</style>
