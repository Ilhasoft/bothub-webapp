<template>
  <repository-view-base
    :repository="repository"
    :error-code="errorCode">
    <div v-if="!authenticated">
      <b-notification
        :closable="false"
        type="is-info">
        {{ $t('webapp.trainings.login') }}
      </b-notification>
      <login-form hide-forgot-password />
    </div>
    <authorization-request-notification
      v-else-if="repository && !repository.authorization.can_contribute"
      :available="!repository.available_request_authorization"
      :repository-uuid="repository.uuid"
      @onAuthorizationRequested="updateRepository(false)" />
    <div v-else-if="repository">
      <div class="columns">
        <div class="column is-3">
          <translation-status-search
            v-model="statusQuery" />
        </div>
        <div class="column">
          <translation-status-info
            :completed-languages="completedLanguages"
            :languages="languagesList"
            :repository-uuid="repository.uuid" />
        </div>
      </div>
      <translations-status
        ref="translationsStatus"
        :update="updateStatus"
        :query="statusQuery"
        :repository-uuid="repository.uuid"
        v-model="toLanguage"
        :translation-list="isListEmpty"
        class="translations__status"
        @updated="statusUpdated"/>
      <hr>
      <div class="translations__list">
        <translations-list
          ref="translationsList"
          :repository="repository"
          :to-language="toLanguage"
          @exampleUpdated="exampleUpdated()"
          @listNoEmpty="checkList()"/>
      </div>
    </div>
  </repository-view-base>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { languageListToDict } from '@/utils';
import AuthorizationRequestNotification from '@/components/repository/AuthorizationRequestNotification';
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import TranslationsStatus from '@/components/translate/NewTranslationsStatus';
import TranslationStatusInfo from '@/components/translate/TranslationStatusInfo';
import TranslationStatusSearch from '@/components/translate/TranslationStatusSearch';
import TranslationsList from '@/components/translate/TranslationsList';
import LoginForm from '@/components/auth/LoginForm';
import RepositoryBase from './Base';


export default {
  name: 'RepositoryTranslations',
  components: {
    RepositoryViewBase,
    TranslationsStatus,
    TranslationsList,
    TranslationStatusInfo,
    AuthorizationRequestNotification,
    TranslationStatusSearch,
    LoginForm,
  },
  extends: RepositoryBase,
  data() {
    return {
      toLanguage: null,
      statusQuery: null,
      updateStatus: false,
      completedLanguages: null,
      translate: {
        from: null,
        to: null,
      },
      isListEmpty: true,
    };
  },
  computed: {
    ...mapGetters([
      'authenticated',
    ]),
    languagesList() {
      return Object.values(
        languageListToDict(this.repository.available_languages),
      );
    },
    translatorsList() {
      const { users } = this.repository.authorizations;
      return users.map(user => user.nickname);
    },
  },
  methods: {
    ...mapActions([
      'getRepository',
    ]),
    statusUpdated({ completed }) {
      this.completedLanguages = completed;
    },
    checkList() {
      this.isListEmpty = false;
    },
    exampleUpdated() {
      this.updateStatus = !this.updateStatus;
    },
  },
};
</script>

<style lang="scss" scoped>

  .translations {

    &__status {
      margin-top: 2.75rem;
    }

    &__header {
      display: flex;
    }
  }
</style>
