<template>
  <div class="example-suggestion-list">
    <div class="example-suggestion-list__section">
      <b-notification
        v-if="loadingExamples"
        :closable="false">
        <b-loading :active.sync="loadingExamples"/>
      </b-notification>
      <div>
        <b-checkbox
          v-model="select"
          :native-value="selectAll">
          {{ $t('webapp.inbox.select_all') }}
        </b-checkbox>
      </div>
      <div class="example-suggestion-list__section__buttonsIcon">
        <b-tooltip :label="$t('webapp.inbox.add_to_train_button')">
          <b-button
            type="is-primary"
            icon-right="refresh"
            @click="()=>{}" />
        </b-tooltip>
        <b-tooltip :label="$t('webapp.inbox.add_to_sentence_button')">
          <b-button
            icon-right="chat-processing"
            type="is-primary"
            @click="()=>{}" />
        </b-tooltip>
      </div>
    </div>
    <paginated-list
      :per-page="perPage"
      :item-component="exampleSuggestion"
      :list="list"
      :loading.sync="loading"
      :editable="editable"
      :repository="repository"
      @event_nlp="nlp = $event"
      @event_addLog="addExampleStructure($event)"
      @event_removeLog="removeExampleStructure($event)"
    />
    <h4
      v-if="list && list.empty && !loading"
      class="example-suggestion-list__empty-message">
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
import ExampleSuggestion from '@/components/shared/accordion/ExampleSuggestion';

export default {
  name: 'ExampleSuggestionList',
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
    list: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      loading: false,
      logAccordion: LogAccordion,
      exampleSuggestion: ExampleSuggestion,
      select: '',
      exampleData: [],
      selectAll: false,
      nlp: {},
      loadingExamples: false,
    };
  },
  computed: {
    ...mapGetters({
      repository: 'getCurrentRepository',
      version: 'getSelectedVersion',
      activeTutorial: 'activeTutorial',
    }),
    confidenceVerify() {
      if (this.exampleData.length > 1) {
        return true;
      }
      return false;
    },
  },
  watch: {
    loading() {
      this.exampleData = [];
      this.select = '';
    },
    query() {
      this.$emit('updateExamples');
    },
    select() {
      if (this.select === true) {
        this.exampleData = [];
      }
      this.$root.$emit('selectAll', this.select);
    },
  },
  methods: {
    ...mapActions([
      'newEvaluateExample',
      'newExample',
      'deleteExample',
    ]),
    addExampleStructure(example) {
      this.exampleData.push(example);
    },
    removeExampleStructure(exampleId) {
      this.exampleData = this.exampleData.filter(example => example.id !== exampleId);
    },
    addToTraining(values) {
      this.loadingExamples = true;
      this.exampleData.map(async ({ data }) => {
        try {
          if (typeof values === 'string') {
            await this.newExample({
              ...data,
              intent: values,
              isCorrected: this.isCorrected,
              repositoryVersion: this.version,
            });
          } else {
            await this.newExample({
              ...data,
              intent: values.intent,
              text: values.text,
              entities: values.entities,
              isCorrected: this.isCorrected,
              repositoryVersion: this.version,
            });
          }
          this.$buefy.toast.open({
            message: `${data.text.bold()} ${this.$t('webapp.inbox.entry_has_add_to_train')}`,
            type: 'is-success',
          });
        } catch (error) {
          this.showError(error, data);
        } finally {
          this.loadingExamples = false;
          this.select = false;
        }
      });
    },
    addToSentences(values) {
      this.loadingExamples = true;
      this.exampleData.map(async ({ data }) => {
        try {
          if (typeof values === 'string') {
            await this.newEvaluateExample({
              ...data,
              intent: values,
              isCorrected: this.isCorrected,
              repositoryVersion: this.version,
            });
          } else {
            await this.newEvaluateExample({
              ...data,
              intent: values.intent,
              text: values.text,
              entities: values.entities,
              isCorrected: this.isCorrected,
              repositoryVersion: this.version,
            });
          }
          this.$buefy.toast.open({
            message: `${data.text.bold()} ${this.$t('webapp.inbox.entry_has_add_to_sentence')}`,
            type: 'is-success',
          });
        } catch (error) {
          this.showError(error, data);
        } finally {
          this.loadingExamples = false;
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
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';
@import '~@/assets/scss/variables.scss';
  .example-suggestion-list {

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
        margin-bottom: 2rem;
        padding-left: 1.6rem;

        @media screen and (max-width: $mobile-width) {
        padding: 0.6rem;
      }

        &__buttonsIcon {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: row;
          > * {
            margin-left: 0.7rem;
          }
        }
    }

  }
</style>
