<template>
  <repository-view-base
    :repository="repository"
    :error-code="errorCode">

    <div
      v-if="!authenticated">
      <b-notification
        :closable="false"
        class="is-danger">
        Sign in to your account to edit this repository.
      </b-notification>
      <login-form hide-forgot-password />
    </div>

    <div
      v-else
      class="versions">
      <div class="version__header">
        <div class="version__header__title__wrapper">
          <h2>{{ $t('webapp.menu.versions') }}</h2>
        </div>
        <p> {{ $t('webapp.versions.edit_choose_version') }} </p>
      </div>
      <RepositoryVersionList
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

</style>
