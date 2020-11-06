<template>
  <div class="log-accordion" >
    <sentence-accordion
      id="tour-inbox-step-1"
      :pending-example="true"
      :is-previous-disabled="true"
      :is-step-blocked="!checked"
      :open.sync="open">

      <div slot="check">
        <b-checkbox
          v-model="checked"
          :native-value="toExample"/>
      </div>

      <div
        slot="header"
        class="columns is-vcentered">
        <div class="column"/>
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
            :highlighted="highlighted" />
        </div>

      </div>
      <div
        slot="options">
        <span class="column log-accordion__version-name"> {{ version_name }} </span>
      </div>
      <div slot="body">
        <h1>oi</h1>
      </div>
    </sentence-accordion>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { getEntityColor } from '@/utils/entitiesColors';
import LogInfo from '@/components/shared/accordion/LogInfo';
import SentenceAccordion from '@/components/shared/accordion/SentenceAccordion';
import LanguageBadge from '@/components/shared/LanguageBadge';
import HighlightedText from '@/components/shared/HighlightedText';
import RawInfo from '@/components/shared/RawInfo';
import RepositoryDebug from '@/components/repository/debug/Debug';
import IntentModal from '@/components/repository/IntentModal';


export default {
  name: 'ExampleSuggestion',
  components: {
    SentenceAccordion,
    LogInfo,
    LanguageBadge,
    HighlightedText,
    RawInfo,
    IntentModal,
  },
  props: {
    id: {
      type: [String, Number],
      required: true,
    },
    text: {
      type: String,
      default: '',
    },
    // nlp_log: {
    //   type: Object,
    //   required: true,
    // },
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
      checked: false,
      highlighted: null,
      nlp_log: {},
      toExample: {},
    };
  },
  computed: {
    ...mapState({
      repository: state => state.Repository.selectedRepository,
    }),
    // toExample() {
    //   return {
    //     repository: this.repository.uuid,
    //     repository_version: this.nlp_log.repository_version,
    //     text: this.text,
    //     language: this.nlp_log.language,
    //     entities: this.entities.map(entity => ({
    //       entity: entity.entity,
    //       start: entity.start,
    //       end: entity.end,
    //     })),
    //     intent: this.intent,
    //     is_corrected: this.isCorrected,
    //   };
    // },
  },
  watch: {
    checked() {
      if (this.checked) {
        this.$emit('dispatchEvent', { event: 'event_nlp', value: this.nlp_log });
        this.$emit('dispatchEvent', { event: 'event_addLog', value: { id: this.id, data: this.toExample } });
      } else {
        this.$emit('dispatchEvent', { event: 'event_removeLog', value: this.id });
      }
    },
  },
  created() {
    this.$root.$on('selectAll', value => this.selectAll(value));
  },
  methods: {
    selectAll(value) {
      this.checked = value;
    },
    getEntityClass(entity) {
      return `entity-${getEntityColor(entity)}`;
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
  @import '~@/assets/scss/colors.scss';
.log-accordion {
  &__menu-title {
    margin: 1rem;
  }
  &__version-name {
    color: $color-primary;
    font-weight: bold;
  }
}
</style>
