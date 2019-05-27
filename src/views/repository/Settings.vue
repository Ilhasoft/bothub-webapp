<template>
  <repository-view-base
    :repository="repository"
    :error-code="errorCode">
    <div v-if="repository">
      <div v-if="authenticated">
        <div
          v-if="repository.authorization.can_write"
          class="bh-grid bh-grid--column">
          <div class="bh-grid__item">
            <h1>Edit Repository</h1>
            <edit-repository-form
              :owner-nickname="repository.owner__nickname"
              :slug="repository.slug"
              :initial-data="getEditInitialData()"
              @edited="onEdited($event)" />
          </div>
          <div class="bh-grid__item">
            <h1>Manage your team</h1>
            <set-authorization-role-form
              ref="setAuthorizationRoleForm"
              :repository-uuid="repository.uuid"
              @roleSetted="onRoleSetted()" />
            <authorizations-list
              ref="authorizationsList"
              :repository-uuid="repository.uuid"
              @edit="onEditRole($event)" />
          </div>
          <div class="bh-grid__item">
            <h1>Authorization Requests</h1>
            <authorization-requests-list
              :repository-uuid="repository.uuid"
              @review="onReviewAuthorizationRequest()" />
          </div>
        </div>
        <div
          v-else
          class="bh-grid">
          <div class="bh-grid__item">
            <div class="bh-notification bh-notification--warning">
              You can not edit this repository
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        class="bh-grid">
        <div class="bh-grid__item">
          <div class="bh-notification bh-notification--info">
            Sign in to your account to edit this repository.
          </div>
          <login-form hide-forgot-password />
        </div>
      </div>
    </div>
  </repository-view-base>
</template>

<script>
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import RepositoryBase from './Base';
import EditProfileForm from '@/components-v1/user/EditProfileForm';
import EditRepositoryForm from '@/components/repository/EditRepositoryForm';
import SetAuthorizationRoleForm from '@/components/repository/SetAuthorizationRoleForm';
import AuthorizationsList from '@/components/repository/AuthorizationsList';
import AuthorizationRequestsList from '@/components/repository/AuthorizationRequestsList';

import LoginForm from '@/components/auth/LoginForm';


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
  methods: {
    getEditInitialData() {
      const {
        name,
        slug,
        language,
        description,
        is_private: isPrivate,
        algorithm,
        use_competing_intents: useCompetingIntents,
        use_name_entities: useNameEntities,
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
        algorithm,
        use_competing_intents: useCompetingIntents,
        use_name_entities: useNameEntities,
      };
    },
    onEdited(repository) {
      if (this.repository.slug === repository.slug) {
        this.updateRepository();
      } else {
        this.$router.push({
          name: 'repository-settings',
          params: {
            ownerNickname: this.repository.owner__nickname,
            slug: repository.slug,
          },
        });
      }
      this.$toast.open({
        message: 'Repository edited!',
        type: 'is-success',
      });
    },
    onRoleSetted() {
      this.$refs.authorizationsList.updateAuthorizations();
    },
    onReviewAuthorizationRequest() {
      this.$refs.authorizationsList.updateAuthorizations();
    },
  },
};
</script>
