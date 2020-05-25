<template>
  <sentence-accordion
    :open.sync="open">

    <div
      slot="header"
      class="level">

      <div class="example-accordion__tag level-left">
        <language-badge :language="language"/>
      </div>
      <div
        class="level-right example-accordion__text">
        <highlighted-text
          :text="text"
          :prefix-color-available="true"
          :prefix-color="entitiesList[0].class"
          :entities="entities"
          :all-entities="repository.entities || repository.entities_list" />
      </div>
    </div>
    <div
      v-if="editing"
      slot="options"
      class="level example-accordion__btns-wrapper">
      <div
        v-if="repository.authorization && repository.authorization.can_contribute"
        class="level-right">
        <div class="level-item">
          <a
            :href="`#delete-example-${id}`"
            class="has-text-danger"
            @click.prevent.stop="editSentence()">
            <b-icon
              icon="pencil"
              size="is-small"
              class="text-color-grey-dark example__icon" />
          </a>
        </div>
      </div>
      <div
        v-if="repository.authorization && repository.authorization.can_contribute"
        class="level-right">
        <div class="level-item">
          <a
            :href="`#delete-example-${id}`"
            class="has-text-danger"
            @click.prevent.stop="deleteThisExample()">
            <b-icon
              icon="delete"
              size="is-small"
              class="text-color-grey-dark example__icon" />
          </a>
        </div>
      </div>
    </div>
    <div slot="body">
      <example-info
        v-if="!editing"
        :entities-list="entitiesList"
        :intent="intent" />

      <edit-example
        v-else
        :entities="entitiesList"
        :intent-to-edit="intent"
        :edit-example-entity-list="true"
        :text-to-edit="text"
        :sentence-id="id"
        :language-edit="language"
        @cancel="cancelEditSentence"/>
    </div>
  </sentence-accordion>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { getEntitiesList } from '@/utils';
import { getEntityColor } from '@/utils/entitiesColors';
import ExampleInfo from '@/components/shared/accordion/ExampleInfo';
import EditExample from '@/components/shared/accordion/EditExample';
import SentenceAccordion from '@/components/shared/accordion/SentenceAccordion';
import HighlightedText from '@/components/shared/HighlightedText';
import LanguageBadge from '@/components/shared/LanguageBadge';
import BadgesCard from '@/components/repository/BadgesCard';

export default {
  name: 'SentencesEntityList',
  components: {
    SentenceAccordion,
    ExampleInfo,
    EditExample,
    HighlightedText,
    LanguageBadge,
    BadgesCard,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    text: {
      type: String,
      default: '',
    },
    entities: {
      type: Array,
      default: /* istanbul ignore next */ () => ([]),
    },
    intent: {
      type: String,
      default: '',
    },
    language: {
      type: String,
      default: '',
    },
    editing: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      open: false,
      deleteDialog: null,
      remove: true,
    };
  },

  computed: {
    ...mapState({
      repository: state => state.Repository.selectedRepository,
    }),
    entitiesList() {
      const entitiesList = getEntitiesList(this.entities);

      return this.entities
        .map((entity, index) => ({
          value: entitiesList[index],
          class: this.getEntityClass(entitiesList[index]),
          label: this.getEntityLabel(entitiesList[index]),
          ...entity,
        }));
    },
  },
  created() {
    this.$root.$on('editableEntities', value => this.editableEntity(value));
  },
  methods: {
    ...mapActions([
      'deleteEvaluateExample',
      'deleteExample',
    ]),
    getEntityClass(entity) {
      const color = getEntityColor(
        entity,
        this.repository.other_label.entities,
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
    deleteThisExample() {
      this.deleteDialog = this.$buefy.dialog.confirm({
        message: this.$t('webapp.trainings.delete_phrase_modal'),
        confirmText: this.$t('webapp.trainings.delete_button'),
        cancelText: this.$t('webapp.trainings.cancel_button'),
        type: 'is-danger',
        onConfirm: async () => {
          await this.deleteExample({ id: this.id });
          this.$emit('dispatchEvent', { event: 'itemDeleted' });
        },
      });
    },
    cancelEditSentence() {
      this.open = !this.open;
    },
    editSentence() {
      this.open = !this.open;
    },
  },
};
</script>

<style lang="scss" scoped>

  .example-accordion {

    &__text {
      max-width: 100%;
    }

    &__tag {
      margin-right: 0.5rem;
    }

    &__btns-wrapper {
        display: flex;
        justify-content: flex-end;
      }
  }
</style>
