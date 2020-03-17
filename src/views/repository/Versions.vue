<template>
  <repository-view-base
    :repository="repository"
    :error-code="errorCode">

    <div class="versions">
      <div class="version__header">
        <div class="version__header__title__wrapper">
          <h2>{{ $t('webapp.menu.versions') }}</h2>
        </div>
        <p> {{ $t('webapp.versions.edit_choose_version') }} </p>
      </div>
      <RepositoryVersionList
        :repository="repository"/>
    </div>
  </repository-view-base>
</template>

<script>
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import RepositoryHandleVersionModal from '@/components/repository/RepositoryHandleVersionModal';
import Loading from '@/components/shared/Loading';
import RepositoryVersionList from '@/components/repository/RepositoryVersionList';
import RepositoryBase from './Base';

export default {
  name: 'RepositoryVersions',
  components: {
    RepositoryViewBase,
    RepositoryHandleVersionModal,
    RepositoryVersionList,
    Loading,
  },
  extends: RepositoryBase,
  data() {
    return {
      perPage: 5,
    };
  },
};
</script>

<style lang="scss" scoped>

</style>
