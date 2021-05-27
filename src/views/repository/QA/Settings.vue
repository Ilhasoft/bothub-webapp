<template>
  <repository-view-base :repository="repository" :error-code="errorCode">
    <div class="settings">
      <div v-if="repository">
        <div v-if="authenticated">
          <div v-if="repository.authorization.can_write">
            <section class="settings__section">
              <div class="settings__section__header">
                <unnnic-card
                  :title="$t('webapp.settings.title_edit_repository')"
                  icon="layout-dashboard-2"
                  type="title"
                  :has-information-icon="false"
                  scheme="aux-blue"
                />
                <p class="settings__section__header__intelligence">
                  Content Intelligence
                </p>
              </div>
              <settings-form/>
            </section>
          </div>
          <authorization-request-notification
            v-else
            :available="!repository.available_request_authorization"
            :repository-uuid="repository.uuid"
            @onAuthorizationRequested="updateRepository(false)"
          />
        </div>
      </div>

      <div v-if="!authenticated">
        <div class="settings__section">
          <b-notification :closable="false" type="is-info">
            {{ $t("webapp.settings.login") }}
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
import SettingsForm from '@/components/repository/QA/SettingsForm';
import LoginForm from '@/components/auth/LoginForm';
import RepositoryBase from '../Base';

export default {
  name: 'RepositorySettings',
  components: {
    RepositoryViewBase,
    SettingsForm,
    LoginForm,
    AuthorizationRequestNotification
  },
  extends: RepositoryBase,
  methods: {
    onEdited(repository) {
      if (this.repository.slug === repository.slug) {
        this.updateRepository();
      } else {
        this.$router.push({
          name: 'repository-settings',
          params: {
            ownerNickname: this.repository.owner.nickname,
            slug: repository.slug
          }
        });
      }
      this.$buefy.toast.open({
        message: 'Repository edited!',
        type: 'is-success'
      });
    },
    onRoleSetted() {
      this.$refs.authorizationsList.updateAuthorizations();
    },
    onReviewAuthorizationRequest() {
      this.$refs.authorizationsList.updateAuthorizations();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/colors.scss";
@import "~@/assets/scss/variables.scss";
@import "~@weni/unnnic-system/dist/unnnic.css";
@import "~@weni/unnnic-system/src/assets/scss/unnnic.scss";

.settings {
  &__section {
    &__header {
      background-color: $unnnic-color-background-snow;

      &__intelligence {
        margin: $unnnic-inline-xs 0 $unnnic-inline-md;
        font-size: $unnnic-font-size-body-gt;
        color: $unnnic-color-neutral-dark;
      }
    }
  }
}
</style>
