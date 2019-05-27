<template>
  <div class="base-evaluate-versions bh-grid bh-grid--column">
    <evaluate-version-list />
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
  },
};
</script>

<style lang="scss" scoped>

</style>
