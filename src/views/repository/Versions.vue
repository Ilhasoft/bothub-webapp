<template>
  <repository-view-base
    :repository="repository"
    :error-code="errorCode">

    <div
      v-if="!authenticated">
      <b-notification
        :closable="false"
        class="is-danger">
        {{ $t('webapp.versions.signin') }}
      </b-notification>
      <login-form hide-forgot-password />
    </div>

    <div
      v-else-if="repository"
      class="versions">
      <div class="version__header">
        <div class="version__header__title__wrapper">
          <h2 class="title">{{ $t('webapp.menu.versions') }}</h2>
        </div>
        <p class="description"> {{ $t('webapp.versions.edit_choose_version') }} </p>
      </div>
      <repository-version-list
        :repository="repository"
        :can-edit="repository.authorization.can_contribute"/>
    </div>
  </repository-view-base>
</template>

<script>
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import RepositoryVersionList from '@/components/repository/RepositoryVersionList';
import { mapGetters } from 'vuex';
import LoginForm from '@/components/auth/LoginForm';
import RepositoryBase from './Base';

export default {
  name: 'RepositoryVersions',
  components: {
    RepositoryViewBase,
    RepositoryVersionList,
    LoginForm,
  },
  extends: RepositoryBase,
  data() {
    return {
      perPage: 5,
    };
  },
  computed: {
    ...mapGetters([
      'authenticated',
    ]),
  },
};
</script>
<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';
@import '~@/assets/scss/variables.scss';

.title{
  font-size: 1.75rem;
  font-weight: $font-weight-medium;
  color: $color-fake-black;
  margin-bottom: $between-title-subtitle;
}
.description {
  margin-bottom: $between-subtitle-content;
}
</style>
