<template>
  <div class="log-accordion">
    <b-notification
      v-if="loading"
      :closable="false">
      <b-loading :active.sync="loading"/>
    </b-notification>

    <sentence-accordion
      :open.sync="open">

      <div
        slot="header"
        class="columns is-vcentered">
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
          class="log-accordion__dropdown"
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
          :created-at="log.created_at"
          @onShowRawInfo="showRawInfo()"/>
      </div>
    </sentence-accordion>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { getEntityColor } from '@/utils/entitiesColors';
import { getWordIndex } from '@/utils';
import LogInfo from '@/components/shared/accordion/LogInfo';
import SentenceAccordion from '@/components/shared/accordion/SentenceAccordion';
import LanguageBadge from '@/components/shared/LanguageBadge';
import HighlightedText from '@/components/shared/HighlightedText';
import RawInfo from '@/components/shared/RawInfo';

export default {
  name: 'LogAccordion',
  components: {
    SentenceAccordion,
    LogInfo,
    LanguageBadge,
    HighlightedText,
    RawInfo,
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
      loading: false,
      isRawInfoActive: false,
    };
  },
  computed: {
    ...mapState({
      repository: state => state.Repository.selectedRepository,
    }),
    entities() {
      return Object.keys(this.log.nlp_log.entities).map(key => this.log.nlp_log.entities[key].map(
        (entity) => {
          const { start, end } = getWordIndex(entity.value, this.log.text);
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
        repository_version: this.log.nlp_log.repository_version,
        text: this.log.text,
        language: this.log.nlp_log.language,
        entities: this.entities.map(entity => ({
          entity: entity.entity,
          start: entity.start,
          end: entity.end,
        })),
        intent: this.log.nlp_log.intent.name,
      };
    },
  },
  methods: {
    ...mapActions([
      'newEvaluateExample',
      'newExample',
    ]),
    showError(error) {
      const messages = Object.values(error.response.data).map(errors => (typeof errors === 'string' ? errors : Array.join(errors, ',')));
      const message = Array.join(messages, ',');
      this.$buefy.dialog.alert({
        title: 'Error',
        message,
        type: 'is-danger',
      });
    },
    async addToTraining() {
      this.loading = true;
      await this.newEvaluateExample(this.toExample).catch((e) => {
        this.loading = false;
        this.showError(e);
      });
      this.loading = false;
    },
    async addToSentences() {
      this.loading = true;
      await this.newExample(this.toExample).catch((e) => {
        this.loading = false;
        this.showError(e);
      });
      this.loading = false;
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
        props: { info: this.log.nlp_log },
        parent: this,
        component: RawInfo,
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
