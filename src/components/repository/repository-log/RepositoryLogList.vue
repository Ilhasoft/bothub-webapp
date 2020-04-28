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
          Select all
        </b-checkbox>
      </div>
      <div class="repository-log-list__section__buttonsIcon">
        <b-tooltip :label="$t('webapp.inbox.add_to_train_button')">
          <div @click="showModal('Training')">
            <b-icon
              icon="refresh"
              class="repository-log-list__section__icons"/>
          </div>
        </b-tooltip>
        <b-tooltip :label="$t('webapp.inbox.add_to_sentence_button')">
          <div @click="showModal('Test Sentences')">
            <b-icon
              icon="chat-processing"
              class="repository-log-list__section__icons"/>
          </div>
        </b-tooltip>
        <!--   <b-tooltip :label="$t('webapp.inbox.remove_log_button')">
          <div @click="showDeleteModal">
          <b-icon
            icon="delete"
            class="repository-log-list__section__icons"/>
        </div>
        </b-tooltip>-->

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
import { mapState, mapActions } from 'vuex';
import PaginatedList from '@/components/shared/PaginatedList';
import LogAccordion from '@/components/shared/accordion/LogAccordion';
import IntentModal from '@/components/repository/IntentModal';

export default {
  name: 'RepositoryLogList',
  components: {
    PaginatedList,
    LogAccordion,
    IntentModal,
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
    ...mapState({
      repository: state => state.Repository.selectedRepository,
    }),
  },
  watch: {
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
      if (logValue.length !== 0) {
        this.logData.push(logValue[0]);
      }
    },
    removeLogStructure(logValue) {
      // eslint-disable-next-line array-callback-return
      this.logData.map((log, i) => {
        if (log.text === logValue[0].text) {
          this.logData.splice(i, 1);
        }
      });
    },
    showModal(typeModal) {
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
        },
        parent: this,
        component: IntentModal,
        hasModalCard: false,
        trapFocus: true,
        events: {
          addedIntent: (value, type) => {
            if (type === 'Training') {
              if (value === this.nlp.intent.name) {
                this.isCorrected = false;
              } else {
                this.isCorrected = true;
              }
              this.addToTraining(value);
            } else {
              if (value === this.nlp.intent.name) {
                this.isCorrected = false;
              } else {
                this.isCorrected = true;
              }
              this.addToSentences(value);
            }
            this.intent = value;
          },
        },
      });
    },
    addToTraining(intent) {
      this.loadingLogs = true;
      this.logData.map(async (log) => {
        try {
          await this.newExample({ ...log, intent, isCorrected: this.isCorrected });
          this.$buefy.toast.open({
            message: `${log.text.bold()} ${this.$t('webapp.inbox.entry_has_add_to_train')}`,
            type: 'is-success',
          });
        } catch (error) {
          this.showError(error, log);
        } finally {
          this.loadingLogs = false;
          this.select = false;
        }
      });
    },
    addToSentences(intent) {
      this.loadingLogs = true;
      this.logData.map(async (log) => {
        try {
          await this.newEvaluateExample({
            ...log,
            intent,
            isCorrected: this.isCorrected,
          });
          this.$buefy.toast.open({
            message: `${log.text.bold()} ${this.$t('webapp.inbox.entry_has_add_to_sentence')}`,
            type: 'is-success',
          });
        } catch (error) {
          this.showError(error, log);
        } finally {
          this.loadingLogs = false;
          this.select = false;
        }
      });
    },
    // showDeleteModal() {
    //   console.log(this.logData);
    //   this.$buefy.dialog.confirm({
    //     message: 'Você tem certeza que deseja deletar as frases ?',
    //     onConfirm: () => {
    //       this.$buefy.toast.open('User confirmed');
    //     },
    //   });
    // },
    showError(error, log) {
      const messages = Object.values(error.response.data).map(errors => (typeof errors === 'string' ? errors : Array.join(errors, ',')));
      let message = '';

      if (Array.join(messages, ',') === 'Intention and Sentence already exists') {
        message = `${log.text.bold()}, ${this.$t('webapp.inbox.entry_error')}`;
      }
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
  .repository-log-list {
    &__pagination {
      margin-top: 1.25rem;
    }

    &__empty-message {
      margin: 2rem;
      text-align: center;
    }

      &__section{
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: $color-grey-dark;
      font-size: 1.1rem;
      font-weight: bold;

      &__buttonsIcon{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
    }
      &__icons{
      color: $color-grey-dark;
      margin-right: 0.7rem;
    }
    }

  }
</style>
