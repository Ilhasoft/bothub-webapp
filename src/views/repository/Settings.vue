<template>
  <repository-view-base
    :repository="repository"
    :loading="loading"
    :error-code="errorCode">
    <div
      v-if="repository && repository.authorization"
      class="repository-settings">
      <div v-if="repository.authorization.can_write">
        <div class="repository-settings__edit-repository-section">
          <h1 class="bh-title-2">Edit Repository</h1>
          <edit-repository-form
            :owner-nickname="repository.owner__nickname"
            :slug="repository.slug"
            :initial-data="getEditInitialData()"
            @edited="onEdited()" />
        </div>
        <hr>
        <div class="repository-settings__manager-team-section">
          <h1 class="bh-title-2">Manager Team</h1>
          <set-authorization-role-form
            ref="setAuthorizationRoleForm"
            :repository-uuid="repository.uuid"
            @roleSetted="onRoleSetted()" />
          <authorizations-list
            ref="authorizationsList"
            :repository-uuid="repository.uuid"
            @edit="onEditRole($event)" />
          <h1 class="bh-title-2">Authorization Requests</h1>
          <authorization-requests-list
            :repository-uuid="repository.uuid"
            @review="onReviewAuthorizationRequest()" />
        </div>
      </div>
      <div
        v-else-if="authenticated"
        class="bh-notification">
        <div class="bh-notification bh-notification--warning">
          You can not edit this repository
        </div>
      </div>
    </div>
    <div
      v-else
      class="repository-settings__login-section bh-notification">
      <div class="bh-notification bh-notification--info">
        Sign in to your account to edit this repository.
      </div>
      <login-form hide-forgot-password />
    </div>
  </repository-view-base>
</template>

<script>
import { mapGetters } from 'vuex';
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import RepositoryBase from './Base';
import EditProfileForm from '@/components-v1/user/EditProfileForm';
import EditRepositoryForm from '@/components-v1/repository/EditRepositoryForm';
import SetAuthorizationRoleForm from '@/components-v1/repository/SetAuthorizationRoleForm';
import AuthorizationsList from '@/components-v1/repository/AuthorizationsList';
import AuthorizationRequestsList from '@/components-v1/repository/AuthorizationRequestsList';
import LoginForm from '@/components-v1/auth/LoginForm';


export default {
  name: 'RepositorySettings',
  components: {
    RepositoryViewBase,
    EditProfileForm,
    EditRepositoryForm,
    SetAuthorizationRoleForm,
    AuthorizationsList,
    AuthorizationRequestsList,
    LoginForm,
  },
  extends: RepositoryBase,
  computed: {
    ...mapGetters([
      'authenticated',
    ]),
  },
  methods: {
    getEditInitialData() {
      const {
        name,
        slug,
        language,
        description,
        is_private: isPrivate,
      } = this.repository;
      return {
        name,
        slug,
        language,
        categories: this.repository.categories.map(
          ({ id, name: n }) => ({ value: id, display_name: n }),
        ),
        description,
        is_private: isPrivate,
      };
    },
    onEdited() {
      this.updateRepository();
      this.editModalOpen = false;
      this.$toast.open({
        message: 'Repository edited!',
        type: 'is-success',
      });
    },
    onRoleSetted() {
      this.$refs.authorizationsList.updateAuthorizations();
    },
  },
};
</script>

<style lang="scss">
  .repository-settings {
    padding: -1rem;

    &__edit-repository-section {
      padding: 1rem;
    }

    &__manager-team-section {
      padding: 1rem;
    }

    &__login-section {
      padding: 1rem;
    }
  }
</style>
