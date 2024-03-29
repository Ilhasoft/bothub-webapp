<template>
  <repository-view-base :repository="repository" :error-code="errorCode">
      <div v-if="authenticated" class="repository-log">
        <div v-if="repository && repository.authorization.can_contribute">
          <div class="repository-log__header">
            <h1>{{ $t("webapp.menu.inbox") }}</h1>
            <p>{{ $t("webapp.inbox.description") }}</p>
          </div>
          <filter-evaluate-example
            v-if="repository"
            :intents="repository.intents_list"
            :versions="versions"
            language-filter
            :hasVersion="false"
            @querystringformatted="onSearch($event)"
          />
          <repository-log-list
            :per-page="perPage"
            :query="query"
            :editable="repository.authorization.can_contribute"
            @dispatchNext="dispatchClick()"
            @dispatchSkip="dispatchClickSkip()"
            @finishedTutorial="dispatchClickFinish()"
          />
        </div>
        <authorization-request-notification
          v-else-if="repository"
          :available="!repository.available_request_authorization"
          :repository-uuid="repositoryUUID"
          @onAuthorizationRequested="updateRepository(false)"
        />
      </div>

      <div v-else>
        <b-notification :closable="false" class="is-info">
          {{ $t("webapp.inbox.signin_you_account") }}
        </b-notification>
        <login-form hide-forgot-password />
      </div>

      <tour
        v-if="activeTutorial === 'inbox'"
        :step-count="5"
        :next-event="eventClick"
        :skip-event="eventSkip"
        :finish-event="eventClickFinish"
        name="inbox"
      />
  </repository-view-base>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import RepositoryLogList from '@/components/repository/repository-log/RepositoryLogList';
import AuthorizationRequestNotification from '@/components/repository/AuthorizationRequestNotification';
import LoginForm from '@/components/auth/LoginForm';
import FilterEvaluateExample from '@/components/repository/repository-evaluate/example/FilterEvaluateExample';
import { LANGUAGES } from '@/utils';
import Tour from '@/components/Tour';

import IntentModal from '@/components/repository/IntentModal';
import RepositoryBase from './Base';

export default {
  name: 'RepositoryLog',
  components: {
    RepositoryViewBase,
    RepositoryLogList,
    LoginForm,
    AuthorizationRequestNotification,
    FilterEvaluateExample,
    Tour,
    IntentModal
  },
  extends: RepositoryBase,
  data() {
    return {
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
    ...mapGetters(['authenticated', 'activeTutorial', 'getCurrentRepository']),
    languages() {
      return Object.keys(this.repository.evaluate_languages_count).map(lang => ({
        value: lang,
        title: LANGUAGES[lang]
      }));
    },
    repositoryUUID() {
      if (!this.repository || this.repository.uuid === 'null') {
        return null;
      }
      return this.repository.uuid;
    },
    versions() {
      if (!this.versionsList) return [];
      return this.versionsList.items;
    },
  },
  watch: {
    async repositoryUUID() {
      if (!this.repositoryUUID) {
        return;
      }
      this.versionsList = await this.getVersions({
        limit: this.perPage,
        query: { repository: this.repositoryUUID }
      });
      this.versionsList.getAllItems();
    }
  },
  methods: {
    ...mapActions(['getVersions']),
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
    }
  }
};

</script>

<style lang="scss" scoped>
@import "~@/assets/scss/colors.scss";
@import "~@/assets/scss/variables.scss";

.maintenance{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 12rem;
  h2{
    margin-top: 1.8rem;
    font-size: $size-small;
    font-weight: $font-weight-medium;
    margin-bottom: $between-title-subtitle;
    color: $color-fake-black;
    text-align: center;
  }
  p{
    text-align: center;
    color: $color-fake-black;
    max-width: 700px;
  }
}

.dont-show{
  display: none;
}
label {
  vertical-align: middle;
}
.repository-log {
  font-family: $font-family;

  &__header {
    margin-bottom: 3.5rem;

    h1 {
      font-size: 1.75rem;
      font-weight: $font-weight-medium;
      color: $color-fake-black;
      margin-bottom: $between-title-subtitle;
    }
  }

  &__icon {
    pointer-events: initial !important;
    cursor: pointer;
  }
}
</style>
