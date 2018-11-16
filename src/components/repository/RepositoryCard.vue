<template>
  <bh-card class="repository-card">
    <div class="bh-grid">
      <div class="bh-grid__item">
        <repository-info :repository="repository" />
      </div>
    </div>
  </bh-card>
</template>

<script>
import RepositoryInfo from '@/components/repository/RepositoryInfo';

const components = {
  RepositoryInfo,
};

export default {
  name: 'RepositoryCard',
  components,
  props: {
    repository: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.repository-card {
  margin: 1rem 0;
}
</style>
