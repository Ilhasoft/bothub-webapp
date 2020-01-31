<template>
  <sentence-accordion
    :open.sync="open">

    <div
      slot="header"
      class="columns">
      <span class="column log-accordion__version-name"> {{ log.nlp_log.repository_version }} </span>
      <div class="column">
        <language-badge :language="log.nlp_log.language"/>
      </div>
      <div
        v-if="!open"
        class="column is-two-thirds">{{ log.text }}</div>

      <div
        v-else
        class="column is-two-thirds">
        <highlighted-text
          v-if="open"
          :text="log.text"
          :entities="entitiesList"
          :all-entities="repository.entities || repository.entities_list" />
      </div>
    </div>

    <div slot="options">

      <b-dropdown
        aria-role="list"
        @click.native.stop>
        <button
          slot="trigger"
          class="button is-text">
          <b-icon icon="plus"/>
        </button>

        <p class="log-accordion__menu-title"> Add to </p>
        <b-dropdown-item
          aria-role="listitem"
          @click.native.stop="addToTraining()">
          Training
        </b-dropdown-item>
        <b-dropdown-item
          aria-role="listitem"
          @click.native.stop="addToSentences()">
          Test Sentences
        </b-dropdown-item>
      </b-dropdown>
    </div>

    <div slot="body">
      <log-info
        :entities-list="entitiesList"
        :intent="log.nlp_log.intent.name"
        :confidence="log.nlp_log.intent.confidence"
        @onShowRawInfo="showRawInfo()"/>
    </div>

  </sentence-accordion>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { getEntityColor } from '@/utils/entitiesColors';
import { getWordIndex } from '@/utils';
import LogInfo from '@/components/shared/accordion/LogInfo';
import SentenceAccordion from '@/components/shared/accordion/SentenceAccordion';
import LanguageBadge from '@/components/shared/LanguageBadge';
import HighlightedText from '@/components/shared/HighlightedText';

export default {
  name: 'LogAccordion',
  components: {
    SentenceAccordion,
    LogInfo,
    LanguageBadge,
    HighlightedText,
  },
  props: {
    log: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      deleteDialog: null,
      open: false,
    };
  },
  computed: {
    ...mapState({
      repository: state => state.Repository.selectedRepository,
    }),
    entities() {
      return Object.keys(this.log.nlp_log.entities).map(key => this.log.nlp_log.entities[key].map((entity) => {
        const { start, end } = getWordIndex(entity.value, this.log.text);
        return {
          label: key,
          start,
          end,
          ...entity,
        };
      })).flat();
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
  },
  methods: {
    ...mapActions([
      'deleteEvaluateExample',
      'deleteExample',
    ]),
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
      this.$buefy.dialog.alert({
        message: JSON.stringify(this.log.nlp_log, undefined, 4),
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
}
</style>
