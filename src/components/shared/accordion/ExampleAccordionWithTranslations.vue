<template>
  <sentence-accordion :open.sync="open">
    <div slot="check">
      <language-badge
        :language="language"
        main />
    </div>
    <div
      v-if="!editing"
      slot="header"
      class="example-item__header">
      <highlighted-text
        :text="text"
        :entities="entities"
        :highlighted="highlighted" />
      <div class="example-item__entities">
        <entity-tag
          v-for="entity in entities"
          :entity-name="entity.entity"
          :key="entity.entity"
          :highlighted="highlighted === entity.entity"
          :group="entity.group"
          @mouseenter.native.stop="highlighted = entity.entity"
          @mouseleave.native.stop="highlighted = null" />
      </div>
    </div>
    <edit-example
      v-else
      slot="header"
      :entities="entities"
      :intent-to-edit="intent"
      :text-to-edit="text"
      :sentence-id="id"
      :language-edit="language"
      :get-all-entities="allEntities"
      edit-example
      @cancel="editing = false"
      @saveList="$emit('updateList')"/>
    <div
      slot="options"
      class="example-item__faded">
      <span
        v-show="!editing"
        class="example-item__intent">
        <strong class="example-item__faded"> {{ $t('webapp.evaluate.intent') }}: </strong>
        {{ intent }}
      </span>
      <span>
        <b-icon
          v-show="!editing"
          :icon="editing ? 'check' : 'pencil'"
          class="clickable"
          size="is-small"
          @click.native.stop="handleEdit" />
        <b-icon
          class="clickable"
          size="is-small"
          icon="delete"
          @click.native.stop="deleteThisExample" />
      </span>
    </div>
  </sentence-accordion>
</template>

<script>
import SentenceAccordion from '@/components/shared/accordion/SentenceAccordion';
import HighlightedText from '@/components/shared/HighlightedText';
import LanguageBadge from '@/components/shared/LanguageBadge';
import EntityTag from '@/components/repository/repository-evaluate/example/EntityTag';
import EditExample from '@/components/shared/accordion/EditExample';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'ExampleAccordionWithTranslations',
  components: {
    SentenceAccordion,
    HighlightedText,
    LanguageBadge,
    EntityTag,
    EditExample,
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
      default: () => ([]),
    },
    intent: {
      type: String,
      default: '',
    },
    language: {
      type: String,
      default: '',
    },
    repository: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      open: false,
      editing: false,
      highlighted: null,
    };
  },
  computed: {
    allEntities() {
      return this.repository.entities;
    },
  },
  methods: {
    ...mapActions([
      'deleteExample',
    ]),
    handleEdit() {
      this.editing = !this.editing;
    },
    deleteThisExample() {
      return new Promise((resolve, reject) => {
        this.deleteDialog = this.$buefy.dialog.confirm({
          message: this.$t('webapp.trainings.delete_phrase_modal'),
          confirmText: this.$t('webapp.trainings.delete_button'),
          cancelText: this.$t('webapp.trainings.cancel_button'),
          type: 'is-danger',
          onConfirm: async () => {
            try {
              await this.deleteExample({ id: this.id });
              this.$emit('deleted');
            } catch (e) {
              reject();
            }
          },
          onCancel: () => {
            /* istanbul ignore next */
            reject();
          },
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/colors.scss';
    .example-item {
        &__header {
            > * :not(:last-child) {
                margin-bottom: 0.5rem;
            }
        }

        &__entities {
            > * {
                margin-right: 0.3rem;
            }
        }

        &__faded {
            color: $color-grey-dark;
        }

        &__intent {
            margin-right: 1rem;
        }
    }
</style>
