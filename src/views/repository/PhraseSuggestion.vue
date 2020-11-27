<template>
  <repository-view-base
    :repository="repository"
    :error-code="errorCode">
    <div v-if="repository">
      <div v-if="authenticated">
        <div
          v-if="repository.authorization.can_contribute"
          class="phrase-suggestion">
          <div class="phrase-suggestion__header">
            <h2 class="phrase-suggestion__header__title">
              {{ $t('webapp.phrase-suggestion.title') }}
            </h2>
            <p class="phrase-suggestion__header__subtitle">
              {{ $t('webapp.phrase-suggestion.subtitle') }}
            </p>
          </div>
          <badges-intents-suggestion
            :list="repository.intents"
            :repository="repository"
            @phraseSuggestion="setPhraseSuggestion($event)"
            @dispatchLoading="updateLoading($event)"/>
          <loading
            v-if="loading"/>
          <intent-suggestion-list
            v-else-if="intentSelected !== ''"
            :per-page="perPage"
            :repository="repository"
            :intent="intentSelected"
            :phrase-list="phraseList"/>
        </div>
        <authorization-request-notification
          v-else
          :available="!repository.available_request_authorization"
          :repository-uuid="repository.uuid"
          @onAuthorizationRequested="updateRepository(false)" />
      </div>
      <div
        v-else>
        <b-notification
          :closable="false"
          type="is-info">
          {{ $t('webapp.trainings.login') }}
        </b-notification>
        <login-form hide-forgot-password />
      </div>
    </div>
  </repository-view-base>
</template>

<script>
import RepositoryBase from './Base';
import { mapGetters, mapActions } from 'vuex';
import Loading from '@/components/shared/Loading';
import LoginForm from '@/components/auth/LoginForm';
import IntentSuggestionList from '@/components/shared/IntentSuggestionList';
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import BadgesIntentsSuggestion from '@/components/repository/BadgesIntentsSuggestion';
import AuthorizationRequestNotification from '@/components/repository/AuthorizationRequestNotification';

export default {
  name: 'PhraseSuggestion',
  components: {
    Loading,
    LoginForm,
    IntentSuggestionList,
    RepositoryViewBase,
    BadgesIntentsSuggestion,
    AuthorizationRequestNotification,
  },
  extends: RepositoryBase,
  data() {
    return {
      perPage: 10,
      loading: false,
      intentSelected: '',
      phraseList: {
        items: [],
        total: 0,
      },
    };
  },
  computed: {
    ...mapGetters({
      authenticated: 'authenticated',
      repositoryVersion: 'getSelectedVersion',
      repositoryUUID: 'getCurrentRepository',
      versionSelected: 'getSelectedVersion',
    }),
  },
  watch: {
    versionSelected() {
      this.intentSelected = '';
    },
  },
  methods: {
    ...mapActions([
      'setEditingStatus',
      'clearSelectedSuggestion',
      'setUpdateRepository',
    ]),
    updateLoading(intent) {
      this.loading = true;
      this.intentSelected = intent;
    },
    async setPhraseSuggestion(value) {
      const phraseValues = Object.values(value);
      this.setEditingStatus(false);
      if (phraseValues.length === 0) {
        this.clearPhraseList();
        this.loading = false;
        return;
      }
      const phraseFiltered = phraseValues[0].map((text, id) => {
        const phrase = {
          id,
          text,
        };
        return (
          phrase
        );
      });
      await this.clearPhraseList();
      this.phraseList.items.push(...phraseFiltered);
      this.phraseList.total = phraseValues[0].length;
      this.loading = false;
    },
    clearPhraseList() {
      this.phraseList.items = [];
      this.phraseList.total = 0;
      this.clearSelectedSuggestion();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';
@import '~@/assets/scss/variables.scss';

.phrase-suggestion{

    &__header{
        &__title{
            margin-bottom: $between-title-subtitle;
            font-weight: $font-weight-bolder;
        }
        &__subtitle{
            margin-bottom: $between-subtitle-content
        }
    }

}

</style>
