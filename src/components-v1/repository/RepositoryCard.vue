<template>
  <div class="card">
    <div class="card-content">
      <repository-info :repository="$attrs" />
    </div>
  </div>
</template>

<script>
import RepositoryInfo from '@/components/repository/RepositoryInfo';

const components = {
  RepositoryInfo,
};

export default {
  name: 'RepositoryCard',
  components,
};
</script>

<style lang="scss" scoped>
.card {
  margin: 1rem 0;
}
</style>
