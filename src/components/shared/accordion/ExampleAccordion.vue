<template>
  <sentence-accordion
    :open.sync="open"
    :pending-example="pendingExample"
    :class="pendingExample ? 'pendingExample' : ''">

    <div
      slot="header"
      class="level">

      <div class="example-accordion__tag level-left">
        <language-badge
          :language="language"
          :is-pending-example="pendingExample"/>
      </div>

      <div
        v-if="!open"
        class="level-right example-accordion__text">{{ text }}</div>

      <div
        v-else
        class="level-right example-accordion__text">
        <highlighted-text
          v-if="open && !editing"
          :text="text"
          :entities="entities"
          :highlighted="highlighted" />
      </div>
    </div>
    <div
      slot="options"
      class="level example-accordion__btns-wrapper">
      <div
        v-if="repository.authorization && repository.authorization.can_contribute"
        class="level-right">
        <div class="level-item">
          <a
            v-show="!editing"
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
        :highlighted.sync="highlighted"
        :intent="intent" />

      <edit-example
        v-else
        :entities="entitiesList"
        :intent-to-edit="intent"
        :edit-example="availableToExample"
        :text-to-edit="text"
        :sentence-id="id"
        :language-edit="language"
        :get-all-entities="allEntities"
        @cancel="cancelEditSentence"
        @saveList="updateList"/>
    </div>
  </sentence-accordion>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { getEntityColor } from '@/utils/entitiesColors';
import ExampleInfo from '@/components/shared/accordion/ExampleInfo';
import EditExample from '@/components/shared/accordion/EditExample';
import SentenceAccordion from '@/components/shared/accordion/SentenceAccordion';
import HighlightedText from '@/components/shared/HighlightedText';
import LanguageBadge from '@/components/shared/LanguageBadge';

export default {
  name: 'ExampleAccordion',
  components: {
    SentenceAccordion,
    ExampleInfo,
    EditExample,
    HighlightedText,
    LanguageBadge,
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
    allEntities: {
      type: Array,
      default: () => [],
    },
    availableToExample: {
      type: Boolean,
      default: false,
    },
    entities: {
      type: Array,
      default: /* istanbul ignore next */ () => ([]),
    },
    intent: {
      type: String,
      default: '',
    },
    training: {
      type: Boolean,
      default: false,
    },
    language: {
      type: String,
      default: '',
    },
    pendingExample: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      open: false,
      deleteDialog: null,
      editing: false,
      highlighted: null,
    };
  },
  computed: {
    ...mapState({
      repository: state => state.Repository.selectedRepository,
    }),
    entitiesList() {
      return this.entities
        .map(entity => ({
          class: this.getEntityClass(entity.entity),
          ...entity,
        }));
    },
  },
  watch: {
    open() {
      if (!this.open) {
        this.cancelEditSentence();
      }
    },
  },
  methods: {
    ...mapActions([
      'deleteEvaluateExample',
      'deleteExample',
    ]),
    getEntityClass(entity) {
      const allEntitiesName = this.repository.entities.map(
        entityValue => entityValue.value,
      );
      const color = getEntityColor(
        entity,
        allEntitiesName,
      );
      return `entity-${color}`;
    },
    deleteThisExample() {
      return new Promise((resolve) => {
        this.deleteDialog = this.$buefy.dialog.confirm({
          title: this.$t('webapp.trainings.delete_phrase_modal_title'),
          message: this.$t('webapp.trainings.delete_phrase_modal'),
          confirmText: this.$t('webapp.trainings.delete_button'),
          cancelText: this.$t('webapp.trainings.cancel_button'),
          type: 'is-danger',
          onConfirm: async () => {
            if (this.training) {
              await this.deleteExample({ id: this.id });
              this.$emit('deleted');
              resolve();
            } else {
              await this.deleteEvaluateExample({
                id: this.id,
                repositoryUuid: this.$store.state.Repository.selectedRepository.uuid,
              });
              this.$emit('deleted');
              resolve();
            }
          },
        });
      });
    },
    cancelEditSentence() {
      this.editing = false;
    },
    editSentence() {
      this.editing = true;
      this.open = true;
    },
    updateList() {
      this.$emit('updateList');
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

  .pendingExample{
    background-color: #f5f5f59c;
  }

</style>
