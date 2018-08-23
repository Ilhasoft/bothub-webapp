<template>
  <repository-view-base
    :repository="repository"
    :loading="loading"
    :error-code="errorCode">
    <h1>Trainings</h1>
  </repository-view-base>
</template>

<script>
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import RepositoryBase from './Base';


const components = {
  RepositoryViewBase,
};

export default {
  name: 'RepositoryTrainings',
  components,
  extends: RepositoryBase,
};
</script>
