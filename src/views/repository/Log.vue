<template>
  <repository-view-base
    :repository="repository"
    :error-code="errorCode">
    <div
      v-if="authenticated"
      class="repository-log">
      <div v-if="repository && repository.authorization.can_contribute">
        <div class="repository-log__header">
          <h1> {{ $t('webapp.menu.inbox') }} </h1>
          <p> {{ $t('webapp.inbox.description') }} </p>
        </div>
        <filter-evaluate-example
          v-if="repository"
          :intents="repository.intents_list"
          :versions="versions"
          language-filter
          @querystringformatted="onSearch($event)"/>
        <repository-log-list
          :per-page="perPage"
          :query="query"
          :list="list"
          :editable="repository.authorization.can_contribute"
          @updateExamples="updateLogs()"
          @dispatchNext="dispatchClick()"
          @dispatchSkip="dispatchClickSkip()"
          @finishedTutorial="dispatchClickFinish()"/>
      </div>
      <authorization-request-notification
        v-else-if="repository"
        :available="!repository.available_request_authorization"
        :repository-uuid="repositoryUUID"
        @onAuthorizationRequested="updateRepository(false)" />
    </div>

    <div
      v-else>
      <b-notification
        :closable="false"
        class="is-info">
        {{ $t('webapp.inbox.signin_you_account') }}
      </b-notification>
      <login-form hide-forgot-password />
    </div>

    <tour
      v-if="activeTutorial === 'inbox'"
      :step-count="5"
      :next-event="eventClick"
      :skip-event="eventSkip"
      :finish-event="eventClickFinish"
      name="inbox" />
  </repository-view-base>

</template>

<script>
import { LANGUAGES } from '@/utils';
import Tour from '@/components/Tour';
import RepositoryBase from './Base';
import { mapGetters, mapActions } from 'vuex';
import LoginForm from '@/components/auth/LoginForm';
import IntentModal from '@/components/repository/IntentModal';
import RepositoryLogList from '@/components/repository/repository-log/RepositoryLogList';
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import AuthorizationRequestNotification from '@/components/repository/AuthorizationRequestNotification';
import FilterEvaluateExample from '@/components/repository/repository-evaluate/example/FilterEvaluateExample';

export default {
  name: 'RepositoryLog',
  components: {
    Tour,
    LoginForm,
    IntentModal,
    RepositoryLogList,
    RepositoryViewBase,
    FilterEvaluateExample,
    AuthorizationRequestNotification,
  },
  extends: RepositoryBase,
  data() {
    return {
      list: {},
      perPage: 12,
      name: '',
      loading: false,
      versionsList: null,
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
      this.updateLogs();
    },
  },
  methods: {
    ...mapActions([
      'getVersions',
      'searchLogs',
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
    async updateLogs() {
      this.list = await this.searchLogs({
        repositoryUUID: this.repository.uuid,
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
  label {
    vertical-align: middle;
  }
  .repository-log {
    &__header {
      margin-bottom: 3.5rem;
    }

    &__icon {
      pointer-events: initial !important;
      cursor: pointer;
    }
  }


</style>
