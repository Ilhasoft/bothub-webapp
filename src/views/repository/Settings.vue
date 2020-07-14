<template>
  <repository-view-base
    :repository="repository"
    :error-code="errorCode">
    <div class="settings">
      <div v-if="repository">
        <div v-if="authenticated">
          <div
            v-if="repository.authorization.can_write">
            <div class="settings__section">
              <h1>{{ $t('webapp.settings.title_edit_repository') }}</h1>
              <edit-repository-form
                :owner-nickname="repository.owner.nickname"
                :slug="repository.slug"
                :initial-data="getEditInitialData()"
                @edited="onEdited($event)" />
            </div>
            <div class="settings__section">
              <h1>{{ $t('webapp.settings.manage_your_team') }}</h1>
              <set-authorization-role-form
                ref="setAuthorizationRoleForm"
                :repository-uuid="repository.uuid"
                @roleSetted="onRoleSetted()" />
              <authorizations-list
                ref="authorizationsList"
                :repository-uuid="repository.uuid" />
            </div>
            <div class="settings__section">
              <h1>{{ $t('webapp.settings.authorization_requests') }}</h1>
              <authorization-requests-list
                :repository-uuid="repository.uuid"
                @review="onReviewAuthorizationRequest()" />
            </div>
          </div>
          <authorization-request-notification
            v-else
            :repository-uuid="repository.uuid"
            @onAuthorizationRequested="updateRepository(false)" />
        </div>
      </div>
      <div
        v-if="!authenticated">
        <div class="settings__section">
          <b-notification
            :closable="false"
            type="is-info">
            {{ $t('webapp.settings.login') }}
          </b-notification>
          <login-form hide-forgot-password />
        </div>
      </div>
    </div>
  </repository-view-base>
</template>

<script>
import AuthorizationRequestNotification from '@/components/repository/AuthorizationRequestNotification';
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import EditProfileForm from '@/components/user/EditProfileForm';
import EditRepositoryForm from '@/components/repository/EditRepositoryForm';
import SetAuthorizationRoleForm from '@/components/repository/SetAuthorizationRoleForm';
import AuthorizationsList from '@/components/repository/AuthorizationsList';
import AuthorizationRequestsList from '@/components/repository/AuthorizationRequestsList';

import LoginForm from '@/components/auth/LoginForm';
import RepositoryBase from './Base';


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
    AuthorizationRequestNotification,
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
        use_analyze_char: useAnalyzeChar,
        use_transformer_entities: useTransformerEntities,
      } = this.repository;
      return {
        name,
        slug,
        language,
        categories: this.repository.categories_list.map(
          ({ id, name: n }) => ({ value: id, display_name: n }),
        ),
        description,
        is_private: isPrivate,
        algorithm,
        use_competing_intents: useCompetingIntents,
        use_name_entities: useNameEntities,
        use_analyze_char: useAnalyzeChar,
        use_transformer_entities: useTransformerEntities,
      };
    },
    onEdited(repository) {
      if (this.repository.slug === repository.slug) {
        this.updateRepository();
      } else {
        this.$router.push({
          name: 'repository-settings',
          params: {
            ownerNickname: this.repository.owner.nickname,
            slug: repository.slug,
          },
        });
      }
      this.$buefy.toast.open({
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

<style lang="scss" scoped>
  .settings {
    &__section {
      margin-bottom: 2rem;
    }
  }
</style>
