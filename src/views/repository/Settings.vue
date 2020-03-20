<template>
  <repository-view-base
    :repository="repository"
    :error-code="errorCode">
    <div class="settings">
      <div v-if="repository">
        <div v-if="authenticated">
          <div
            v-if="repository.authorization.can_write">
            <div class="tile is-vertical">
              <h1>{{ $t('webapp.settings.title_edit_repository') }}</h1>
              <edit-repository-form
                :owner-nickname="repository.owner__nickname"
                :slug="repository.slug"
                :initial-data="getEditInitialData()"
                @edited="onEdited($event)" />
            </div>
            <div class="tile is-vertical">
              <h1>{{ $t('webapp.settings.manage_your_team') }}</h1>
              <set-authorization-role-form
                ref="setAuthorizationRoleForm"
                :repository-uuid="repository.uuid"
                @roleSetted="onRoleSetted()" />
              <authorizations-list
                ref="authorizationsList"
                :repository-uuid="repository.uuid"
                @edit="onEditRole($event)" />
            </div>
            <div class="tile is-vertical">
              <h1>{{ $t('webapp.settings.authorization_requests') }}</h1>
              <authorization-requests-list
                :repository-uuid="repository.uuid"
                @review="onReviewAuthorizationRequest()" />
            </div>
          </div>
          <div
            v-else>
            <div class="bh-grid__item">
              <div class="bh-notification bh-notification--warning">
                {{ $t('webapp.settings.not_can_edit_repository') }}
                <request-authorization-modal
                  v-if="repository"
                  :open.sync="requestAuthorizationModalOpen"
                  :repository-uuid="repository.uuid"
                  @requestDispatched="onAuthorizationRequested()" />
                <a
                  class="requestAuthorization"
                  @click="openRequestAuthorizationModal">
                  {{ $t('webapp.layout.request_authorization') }}
                </a>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-else>
        <div class="tile is-vertical">
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
import RequestAuthorizationModal from '@/components/repository/RequestAuthorizationModal';
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
    RequestAuthorizationModal,
  },
  extends: RepositoryBase,
  data() {
    return {
      requestAuthorizationModalOpen: false,
    };
  },
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
    openRequestAuthorizationModal() {
      this.requestAuthorizationModalOpen = true;
    },
    onAuthorizationRequested() {
      this.requestAuthorizationModalOpen = false;
      this.$bhToastNotification({
        message: 'Request made! Wait for review of an admin.',
        type: 'success',
      });
      this.updateRepository(false);
    },
  },
};
</script>

<style lang="scss" scoped>

  @import '~@/assets/scss/utilities.scss';
  @import '~@/assets/scss/colors.scss';
  @import '~@/assets/scss/variables.scss';

    .settings {
      @include default-margin;
    }
    .requestAuthorization{
        color: $color-fake-black;
        font-weight: $font-weight-medium;
        text-align: center;
        float: right
      }
    a {
    text-decoration: none !important;
    }


</style>
