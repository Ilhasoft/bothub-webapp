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
      :repository-uuid="repository.uuid"
      @onAuthorizationRequested="updateRepository(false)" />
    <div v-else-if="repository">
      <div class="translations__header">
        <translations-status
          ref="translationsStatus"
          :repository-uuid="repository.uuid"
          v-model="toLanguage" />
      </div>
      <hr>
      <div class="translations__list">
        <translations-list
          ref="translationsList"
          :repository="repository"
          :to-language="toLanguage"
          @exampleUpdated="exampleUpdated()" />
      </div>
    </div>
  </repository-view-base>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AuthorizationRequestNotification from '@/components/repository/AuthorizationRequestNotification';
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import TranslationsStatus from '@/components/translate/TranslationsStatus';
import TranslationsList from '@/components/translate/TranslationsList';
import LoginForm from '@/components/auth/LoginForm';
import RepositoryBase from './Base';


export default {
  name: 'RepositoryTranslations',
  components: {
    RepositoryViewBase,
    TranslationsStatus,
    TranslationsList,
    mapGetters,
    AuthorizationRequestNotification,
    LoginForm,
  },
  extends: RepositoryBase,
  data() {
    return {
      toLanguage: null,
      translate: {
        from: null,
        to: null,
      },
    };
  },
  computed: {
    ...mapGetters([
      'authenticated',
    ]),
  },
  methods: {
    ...mapActions([
      'getRepository',
    ]),
    exampleUpdated() {
      this.updateRepository(false);
    },
  },
};
</script>
