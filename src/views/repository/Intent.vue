<template>
  <repository-view-base
    :repository="repository"
    :error-code="errorCode">
    <div
      v-if="authenticated"
      class="entity-list">
      <div v-if="repository && repository.authorization.can_contribute">
        <intents-list
          :intents-list="examplesList"
          :repository="repository"
          @saveEdition="onItemSave()"/>
        <paginated-list
          v-if="examplesList"
          :item-component="sentencesIntenties"
          :list="examplesList"
          :repository="repository"
          :per-page="perPage"
          @itemDeleted="onItemDeleted()"
          @itemSave="onItemSave()"/>
        <p
          v-if="examplesList && examplesList.empty"
          class="no-examples">{{ $t('webapp.entity.no_sentences') }}</p>
      </div>
      <b-notification
        v-else
        :closable="false"
        class="repository-log__notification"
        type="is-warning">
        {{ $t('webapp.evaluate.you_can_not_edit') }}
        <request-authorization-modal
          v-if="repository"
          :open.sync="requestAuthorizationModalOpen"
          :available="!repository.available_request_authorization"
          :repository-uuid="repository.uuid"
          @requestDispatched="onAuthorizationRequested()" />
        <a
          class="requestAuthorization"
          @click="openRequestAuthorizationModal">
          {{ $t('webapp.layout.request_authorization') }}
        </a>
      </b-notification>
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
  </repository-view-base>

</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import RepositoryBase from './Base';
import LoginForm from '@/components/auth/LoginForm';
import IntentsList from '@/components/repository/IntentsList';
import PaginatedList from '@/components/shared/PaginatedList';
import RepositoryViewBase from '@/components/repository/RepositoryViewBase';
import SentencesIntentList from '@/components/repository/SentencesIntentList';
import RequestAuthorizationModal from '@/components/repository/RequestAuthorizationModal';
import Loading from '@/components/shared/Loading';

export default {
  name: 'Intent',
  components: {
    RepositoryViewBase,
    LoginForm,
    RequestAuthorizationModal,
    PaginatedList,
    SentencesIntentList,
    IntentsList,
    Loading,
  },
  extends: RepositoryBase,
  props: {
    perPage: {
      type: Number,
      default: 12,
    },
    update: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      name: 'Entity',
      examplesList: null,
      totalList: 0,
      intentSearch: {
        intent_id: this.$route.params.intent,
      },
      query: {},
      sentencesIntenties: SentencesIntentList,
      requestAuthorizationModalOpen: false,
      querySchema: {},
    };
  },
  computed: {
    ...mapGetters({
      repositoryVersion: 'getSelectedVersion',
      repositoryList: 'getCurrentRepository',
    }),
  },
  watch: {
    query() {
      this.updateExamples(true);
    },
    update() {
      this.updateExamples(true);
    },
    repositoryList() {
      this.updateExamples();
    },
    intentSearch() {
      this.updateExamples(true);
    },
  },
  mounted() {
    this.updateExamples();
  },
  methods: {
    ...mapActions([
      'searchExamples',
    ]),
    async updateExamples(force = false) {
      if (this.repositoryList.uuid !== undefined) {
        if (!this.examplesList || force) {
          this.examplesList = await this.searchExamples({
            repositoryUuid: this.repositoryList.uuid,
            version: this.repositoryVersion,
            query: this.intentSearch,
            limit: this.perPage,
          });
        }
      }
    },
    onItemDeleted() {
      this.updateExamples(true);
    },
    onItemSave() {
      this.updateExamples(true);
    },
    openRequestAuthorizationModal() {
      this.requestAuthorizationModalOpen = true;
    },
    onAuthorizationRequested() {
      this.requestAuthorizationModalOpen = false;
      this.$buefy.toast.open({
        message: this.$t('webapp.layout.authorization_success'),
        type: 'success',
      });
      this.updateRepository(false);
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
  .requestAuthorization{
      color: $color-fake-black;
      font-weight: $font-weight-medium;
      text-align: center;
      float: right
    }
  .entity-list {
    margin: 0.4rem;
  }


</style>
