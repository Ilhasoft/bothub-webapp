<template>

  <div class="repository-log-list">
    <div class="repository-log-list__section">
      <b-notification
        v-if="loadingLogs"
        :closable="false">
        <b-loading :active.sync="loadingLogs"/>
      </b-notification>
      <div>
        <b-checkbox
          v-model="select"
          :native-value="selectAll">
          {{ $t('webapp.inbox.select_all') }}
        </b-checkbox>
      </div>
      <div class="repository-log-list__section__buttonsIcon">
        <b-tooltip :label="$t('webapp.inbox.add_to_train_button')">
          <div
            @click="showModalTraining($t('webapp.inbox.training'))">
            <b-icon
              id="tour-inbox-step-2"
              :is-previous-disabled="true"
              icon="refresh"
              class="repository-log-list__section__icons"/>
          </div>
        </b-tooltip>
        <b-tooltip :label="$t('webapp.inbox.add_to_sentence_button')">
          <div
            @click="showModalSentence($t('webapp.inbox.test_sentences'))">
            <b-icon
              id="tour-inbox-step-3"
              :is-previous-disabled="true"
              :is-next-disabled="true"
              icon="chat-processing"
              class="repository-log-list__section__icons"/>
          </div>
        </b-tooltip>
      </div>
    </div>
    <paginated-list
      :per-page="perPage"
      :item-component="logAccordion"
      :list="list"
      :loading.sync="loading"
      :editable="editable"
      @event_nlp="nlp = $event"
      @event_addLog="addLogStructure($event)"
      @event_removeLog="removeLogStructure($event)"
    />

    <h4
      v-if="list && list.empty && !loading"
      class="repository-log-list__empty-message">
      {{ $t('webapp.inbox.list_empty') }}
    </h4>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import PaginatedList from '@/components/shared/PaginatedList';
import LogAccordion from '@/components/shared/accordion/LogAccordion';
import IntentModal from '@/components/repository/IntentModal';
import IntentModalEdition from '@/components/repository/IntentModalWithEdition';

export default {
  name: 'RepositoryLogList',
  components: {
    PaginatedList,
    LogAccordion,
    IntentModal,
    IntentModalEdition,
  },
  props: {
    query: {
      type: Object,
      default: null,
    },
    perPage: {
      type: Number,
      default: 20,
    },
    editable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      list: null,
      loading: false,
      logAccordion: LogAccordion,
      versionsList: null,
      versions: [],
      select: '',
      logData: [],
      selectAll: false,
      nlp: {},
      loadingLogs: false,
    };
  },
  computed: {
    ...mapGetters({
      repository: 'getCurrentRepository',
      version: 'getSelectedVersion',
      activeTutorial: 'activeTutorial',
    }),
    confidenceVerify() {
      if (this.logData.length > 1) {
        return true;
      }
      return false;
    },
  },
  watch: {
    loading() {
      this.logData = [];
      this.select = '';
    },
    query() {
      this.updateLogs();
    },
    select() {
      if (this.select === true) {
        this.logData = [];
      }
      this.$root.$emit('selectAll', this.select);
    },
  },
  mounted() {
    this.updateLogs();
  },
  methods: {
    ...mapActions([
      'searchLogs',
      'newEvaluateExample',
      'newExample',
      'deleteExample',
    ]),
    addLogStructure(logValue) {
      this.logData.push(logValue);
    },
    removeLogStructure(logId) {
      this.logData = this.logData.filter(log => log.id !== logId);
    },
    showModalTraining(typeModal) {
      if (this.activeTutorial === 'inbox') return;

      if (this.logData.length === 0) {
        this.$buefy.toast.open({
          message: this.$t('webapp.inbox.select_phrase'),
          type: 'is-danger',
        });
        return;
      }
      this.$buefy.modal.open({
        props: {
          info: this.nlp,
          repository: this.repository,
          titleHeader: typeModal,
          confidenceVerify: this.confidenceVerify,
          logData: this.logData[0],
        },
        parent: this,
        component: this.logData.length === 1 ? IntentModalEdition : IntentModal,
        hasModalCard: false,
        trapFocus: true,
        canCancel: false,
        events: {
          addedIntent: (value) => {
            this.verifyIsCorrected(value);
            this.addToTraining(value);
            this.intent = value;
          },
          closeModal: () => {
            this.logData = [];
            this.select = '';
            this.$root.$emit('selectAll', false);
          },
        },
      });
    },
    showModalSentence(typeModal) {
      if (this.logData.length === 0) {
        this.$buefy.toast.open({
          message: this.$t('webapp.inbox.select_phrase'),
          type: 'is-danger',
        });
        return;
      }
      this.$buefy.modal.open({
        props: {
          info: this.nlp,
          repository: this.repository,
          titleHeader: typeModal,
          logData: this.logData[0],
        },
        parent: this,
        component: this.logData.length === 1 ? IntentModalEdition : IntentModal,
        hasModalCard: false,
        trapFocus: true,
        canCancel: false,
        width: 700,
        events: {
          addedIntent: (value) => {
            this.verifyIsCorrected(value);
            this.addToSentences(value);
            this.intent = value;
            if (this.activeTutorial === 'inbox') {
              this.$emit('finishedTutorial');
            }
          },
          closeModal: () => {
            this.logData = [];
            this.select = '';
            this.$root.$emit('selectAll', false);
            if (this.activeTutorial === 'inbox') {
              this.$emit('dispatchSkip');
            }
          },
        },
      });
      this.$nextTick(() => {
        this.$emit('dispatchNext');
      });
    },
    verifyIsCorrected(value) {
      if (value === this.nlp.intent.name) {
        this.isCorrected = false;
      } else {
        this.isCorrected = true;
      }
    },
    addToTraining(values) {
      this.loadingLogs = true;
      this.logData.map(async ({ data }) => {
        try {
          await this.newExample({
            ...data,
            intent: values.intent,
            text: values.text,
            entities: values.entities,
            isCorrected: this.isCorrected,
            repositoryVersion: this.version,
          });
          this.$buefy.toast.open({
            message: `${values.text.bold()} ${this.$t('webapp.inbox.entry_has_add_to_train')}`,
            type: 'is-success',
          });
        } catch (error) {
          this.showError(error, data);
        } finally {
          this.loadingLogs = false;
          this.select = false;
        }
      });
    },
    addToSentences(values) {
      this.loadingLogs = true;
      this.logData.map(async ({ data }) => {
        try {
          await this.newEvaluateExample({
            ...data,
            intent: values.intent,
            text: values.text,
            entities: values.entities,
            isCorrected: this.isCorrected,
            repositoryVersion: this.version,
          });
          this.$buefy.toast.open({
            message: `${values.text.bold()} ${this.$t('webapp.inbox.entry_has_add_to_sentence')}`,
            type: 'is-success',
          });
        } catch (error) {
          this.showError(error, data);
        } finally {
          this.loadingLogs = false;
          this.select = false;
        }
      });
    },
    showError(error, log) {
      const messages = Object.values(error.response.data).map(errors => (typeof errors === 'string' ? errors : Array.join(errors, ',')));
      const message = `${log.text.bold()}, ${Array.join(messages, ',')}`;
      this.$buefy.toast.open({
        message,
        type: 'is-danger',
      });
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
  .repository-log-list {
    &__pagination {
      margin-top: 1.25rem;
    }

    &__empty-message {
      margin: 2rem;
      text-align: center;
    }

      &__section {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: $color-grey-dark;
        font-size: 1.1rem;
        font-weight: bold;
        padding: 0 .6rem 0 1.6rem;

        @media screen and (max-width: $mobile-width) {
        padding: 0.6rem;
      }

        &__buttonsIcon {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: row;
        }
        &__icons {
          color: $color-grey-dark;
          margin-right: 0.7rem;
          cursor: pointer;
        }
    }

  }
</style>
