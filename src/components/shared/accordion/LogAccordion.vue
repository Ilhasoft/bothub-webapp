<template>
  <div class="log-accordion">
    <b-notification
      v-if="loading"
      :closable="false">
      <b-loading :active.sync="loading"/>
    </b-notification>
    <sentence-accordion
      :open.sync="open">

      <div slot="check">
        <b-checkbox
          v-model="data"
          :native-value="toExample"/>
      </div>

      <div
        slot="header"
        class="columns is-vcentered">
        <div class="column">
          <language-badge :language="nlp_log.language"/>
        </div>
        <div
          v-if="!open"
          class="column is-full">{{ text }}</div>

        <div
          v-else
          class="column is-full">
          <highlighted-text
            v-if="open"
            :text="text"
            :entities="entitiesList"
            :all-entities="repository.entities || repository.entities_list" />
        </div>

      </div>
      <div
        slot="options">
        <span class="column log-accordion__version-name"> {{ version_name }} </span>
      </div>
      <div slot="body">
        <log-info
          :entities-list="entitiesList"
          :intent="nlp_log.intent.name"
          :confidence="nlp_log.intent.confidence"
          :created-at="created_at"
          @onShowRawInfo="showRawInfo()"
          @debug="debug()"/>
      </div>
    </sentence-accordion>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import { getEntityColor } from '@/utils/entitiesColors';
import { getWordIndex } from '@/utils';
import LogInfo from '@/components/shared/accordion/LogInfo';
import SentenceAccordion from '@/components/shared/accordion/SentenceAccordion';
import LanguageBadge from '@/components/shared/LanguageBadge';
import HighlightedText from '@/components/shared/HighlightedText';
import RawInfo from '@/components/shared/RawInfo';
import RepositoryDebug from '@/components/repository/debug/Debug';
import IntentModal from '@/components/repository/IntentModal';


export default {
  name: 'LogAccordion',
  components: {
    SentenceAccordion,
    LogInfo,
    LanguageBadge,
    HighlightedText,
    RawInfo,
    IntentModal,
  },
  props: {
    text: {
      type: String,
      default: '',
    },
    nlp_log: {
      type: Object,
      required: true,
    },
    created_at: {
      type: String,
      default: '',
    },
    version_name: {
      type: String,
      default: '',
    },
    editable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      deleteDialog: null,
      open: false,
      loading: false,
      isRawInfoActive: false,
      intent: '',
      isCorrected: Boolean,
      data: [],
    };
  },
  computed: {
    ...mapState({
      repository: state => state.Repository.selectedRepository,
    }),
    ...mapGetters(['getLogSentence']),
    entities() {
      return Object.keys(this.nlp_log.entities).map(key => this.nlp_log.entities[key].map(
        (entity) => {
          const { start, end } = getWordIndex(entity.value, this.text);
          return {
            start,
            end,
            ...entity,
          };
        },
      )).flat();
    },
    entitiesList() {
      return this.entities
        .map((entity, index) => ({
          value: this.entities[index],
          class: this.getEntityClass(this.entities[index]),
          label: this.getEntityLabel(this.entities[index]),
          ...entity,
        }));
    },
    toExample() {
      return {
        repository: this.repository.uuid,
        repository_version: this.nlp_log.repository_version,
        text: this.text,
        language: this.nlp_log.language,
        entities: this.entities.map(entity => ({
          entity: entity.entity,
          start: entity.start,
          end: entity.end,
        })),
        intent: this.intent,
        is_corrected: this.isCorrected,
      };
    },
  },
  watch: {
    data(newValue, oldValue) {
      if (this.data.length !== 0) {
        return this.$store.dispatch('newLogSentence', this.data);
      }
      return this.$store.dispatch('removeLogSentence', oldValue);
    },
    nlp_log() {
      return this.$root.$emit('nlp_values', this.nlp_log);
    },
  },
  created() {
    this.$root.$on('selectAll', value => this.selectAll(value));
  },
  methods: {
    ...mapActions([
      'newEvaluateExample',
      'newExample',
      'newLogSentence',
      'removeLogSentence',
    ]),
    selectAll(value) {
      if (value === true) {
        this.data.push(this.toExample);
      } else {
        this.data = [];
      }
    },
    showError(error) {
      const messages = Object.values(error.response.data).map(errors => (typeof errors === 'string' ? errors : Array.join(errors, ',')));
      const message = Array.join(messages, ',');
      this.$buefy.toast.open({
        message,
        type: 'is-danger',
      });
    },
    async addToSentences(intent) {
      this.loading = true;
      try {
        await this.newEvaluateExample({
          ...this.toExample,
          intent,
          isCorrected: this.isCorrected,
        });

        this.$buefy.toast.open({
          message: this.$t('webapp.inbox.entry_has_add_to_sentence'),
          type: 'is-success',
        });
      } catch (error) {
        this.showError(error);
        // this.$buefy.toast.open({
        //   message: this.$t('webapp.inbox.add_to_train_error'),
        //   type: 'is-danger',
        // });
      } finally {
        this.loading = false;
      }
    },
    async addToTraining(intent) {
      this.loading = true;
      try {
        await this.newExample({ ...this.toExample, intent, isCorrected: this.isCorrected });
        this.$buefy.toast.open({
          message: this.$t('webapp.inbox.entry_has_add_to_train'),
          type: 'is-success',
        });
      } catch (error) {
        this.showError(error);
        // this.$buefy.toast.open({
        //   message: this.$t('webapp.inbox.add_to_sentences_error'),
        //   type: 'is-danger',
        // });
      } finally {
        this.loading = false;
      }
    },
    getEntityClass(entity) {
      const color = getEntityColor(
        entity,
        this.repository.entities || this.repository.entities_list,
        this.entities,
      );
      return `entity-${color}`;
    },
    getEntityLabel(entityName) {
      return this.entities.reduce((current, e) => {
        if (e.entity === entityName) {
          return e.label;
        }
        return current;
      }, 'unlabeled');
    },
    showRawInfo() {
      this.$buefy.modal.open({
        props: { info: this.nlp_log },
        parent: this,
        component: RawInfo,
        hasModalCard: false,
        trapFocus: true,
      });
    },

    debug() {
      this.$buefy.modal.open({
        parent: this,
        component: RepositoryDebug,
        props: {
          repositoryUUID: this.repository.uuid,
          version: this.nlp_log.repository_version,
          language: this.nlp_log.language,
          text: this.text,
        },
        hasModalCard: false,
        trapFocus: true,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../../../assets/scss/utilities';
.log-accordion {
  &__menu-title {
    margin: 1rem;
  }
  &__version-name {
    color: $primary;
    font-weight: bold;
  }
  &__dropdown {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
