<template>
  <div class="base-evaluate-versions bh-grid bh-grid--column">
    <bh-button
      class="base-evaluate-versions__btn"
      primary> Run new test </bh-button>
    <evaluate-version-item/>
  </div>
</template>

<script>
import EvaluateVersionItem from '@/components/repository/repository-evaluate/versions/EvaluateVersionItem';


export default {
  name: 'BaseEvaluateVersions',
  components: {
    EvaluateVersionItem,
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
