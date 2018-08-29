<template>
  <repository-view-base
    :repository="repository"
    :loading="loading"
    :error-code="errorCode">
    <div
      v-if="repository"
      class="trainings">
      <intents-and-labels-list
        :intents="repository.intents"
        :labels="repository.labels" />
    </div>
  </repository-view-base>
</template>

<script>
import RepositoryBase from './Base';
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import IntentsAndLabelsList from '@/components/repository/IntentsAndLabelsList';


export default {
  name: 'RepositoryTrainings',
  components: {
    RepositoryViewBase,
    IntentsAndLabelsList,
  },
  extends: RepositoryBase,
};
</script>

<style lang="scss" scoped>
.trainings {
  padding: 1rem;
}
</style>
