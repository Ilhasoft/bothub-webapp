<template>
  <div class="base-evaluate-versions bh-grid bh-grid--column">
    <bh-button
      class="base-evaluate-versions__btn"
      primary> Run new test </bh-button>
    <evaluate-version-list
      :repository="repository"
    />
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
  data() {
    return {
    };
  },
};
</script>

<style lang="scss" scoped>
.base-evaluate-versions {
  &__btn {
    align-self: center;
    margin: 1rem;
    left: .75rem;
  }
}
</style>
