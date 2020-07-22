<template>
  <div class="log-accordion" >
    <sentence-accordion
      id="tour-inbox-step-1"
      :is-step-blocked="data.length === 0"
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
            :highlighted="highlighted"
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
          :highlighted.sync="highlighted"
          @onShowRawInfo="showRawInfo()"
          @debug="debug()"/>
      </div>
    </sentence-accordion>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
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
      highlighted: null,
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
          if (entity.start && entity.end) return entity;
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
        this.$emit('dispatchEvent', { event: 'event_nlp', value: this.nlp_log });
        this.$emit('dispatchEvent', { event: 'event_addLog', value: this.data });
        return '';
      }
      return this.$emit('dispatchEvent', { event: 'event_removeLog', value: oldValue });
    },
  },
  created() {
    this.$root.$on('selectAll', value => this.selectAll(value));
  },
  methods: {
    selectAll(value) {
      if (value === true) {
        this.data.push(this.toExample);
      } else {
        this.data = [];
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
