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
            :list="repository.intents"/>
          <example-suggestion-list
            :per-page="perPage"
            :query="query"
            :list="list"
            :editable="repository.authorization.can_contribute"
            is-suggestion
            @updateExamples="updateLogs()"/>
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
import { LANGUAGES } from '@/utils';
import RepositoryBase from './Base';
import { mapGetters, mapActions } from 'vuex';
import LoginForm from '@/components/auth/LoginForm';
import ExampleSuggestionList from '@/components/shared/ExampleSuggestionList';
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import BadgesIntentsSuggestion from '@/components/repository/BadgesIntentsSuggestion';
import ExampleItem from '@/components/example/ExampleItem';
import PaginatedList from '@/components/shared/PaginatedList';

export default {
  name: 'PhraseSuggestion',
  components: {
    LoginForm,
    ExampleSuggestionList,
    RepositoryViewBase,
    BadgesIntentsSuggestion,
    PaginatedList,
  },
  extends: RepositoryBase,
  data() {
    return {
      list: {},
      perPage: 12,
      name: '',
      loading: false,
      versionsList: null,
      examplesList: null,
      exampleItemElem: ExampleItem,
      query: {},
      eventClick: false,
      eventSkip: false,
      eventClickFinish: false,
    };
  },
  computed: {
    ...mapGetters([
      'authenticated',
      'activeTutorial',
    ]),
    languages() {
      return Object.keys(this.repository.evaluate_languages_count)
        .map(lang => ({
          value: lang,
          title: LANGUAGES[lang],
        }));
    },
    repositoryUUID() {
      if (!this.repository || this.repository.uuid === 'null') { return null; }
      return this.repository.uuid;
    },
    versions() {
      if (!this.versionsList) return [];
      return this.versionsList.items;
    },
  },
  watch: {
    async repositoryUUID() {
      if (!this.repositoryUUID) { return; }
      this.versionsList = await this.getVersions({
        limit: this.perPage,
        query: { repository: this.repositoryUUID },
      });
      this.versionsList = this.versionsList;
      this.versionsList.getAllItems();
      this.getExamples();
    },
  },
  methods: {
    ...mapActions([
      'getVersions',
      'searchExamples',
    ]),
    onSearch(query) {
      const filteredQuery = {};
      Object.entries({ ...this.query, ...query }).forEach(([key, value]) => {
        if (value && value.length > 0) filteredQuery[key] = value;
      });
      this.query = filteredQuery;
    },
    dispatchClickSkip() {
      this.eventSkip = !this.eventSkip;
    },
    dispatchClickFinish() {
      this.eventClickFinish = !this.eventClickFinish;
    },
    dispatchClick() {
      this.eventClick = !this.eventClick;
    },
    async getExamples() {
      this.list = await this.searchExamples({
        repositoryUuid: this.repositoryUUID,
        version: this.repository.repository_version_id,
        query: this.query,
        limit: this.perPage,
      });
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
