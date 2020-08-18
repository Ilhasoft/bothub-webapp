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
        <translation-status-search
          v-model="statusQuery"
          class="column is-3" />
        <div class="column translations__header__info">
          <numbers-card
            :count="4"
            label="languages"
            clickable />
          <numbers-card
            :count="2"
            label="completed"
            clickable />
          <numbers-card
            :count="4"
            label="translators"
            clickable />
        </div>
      </div>
      <translations-status
        ref="translationsStatus"
        :update="updateStatus"
        :query="statusQuery"
        :repository-uuid="repository.uuid"
        v-model="toLanguage"
        :translation-list="isListEmpty"/>
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
import AuthorizationRequestNotification from '@/components/repository/AuthorizationRequestNotification';
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import TranslationsStatus from '@/components/translate/NewTranslationsStatus';
import TranslationStatusSearch from '@/components/translate/TranslationStatusSearch';
import TranslationsList from '@/components/translate/TranslationsList';
import NumbersCard from '@/components/shared/NumbersCard';
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
    TranslationStatusSearch,
    NumbersCard,
    LoginForm,
  },
  extends: RepositoryBase,
  data() {
    return {
      toLanguage: null,
      statusQuery: null,
      updateStatus: false,
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
  },
  methods: {
    ...mapActions([
      'getRepository',
    ]),
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
@import '~@/assets/scss/colors.scss';

  .translations {
    &__header {
      display: flex;

      &__info {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        border: 1px solid $color-border;

        > * {
          margin-right: 1rem;
        }
      }
    }
  }
</style>
