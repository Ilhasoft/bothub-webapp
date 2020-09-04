<template>
  <component
    ref="accordion"
    :is="editing ? 'edit-example-accordion' : 'sentence-accordion'"
    :open.sync="open"
    :entities="entities"
    :intent-to-edit="intent"
    :text-to-edit="text"
    :sentence-id="id"
    :language-edit="language"
    :get-all-entities="allEntities"
    align="top"
    edit-example
    @cancel="editing = false"
    @saveList="onSaveList"
  >
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
    <div
      v-show="!editing"
      slot="options"
      class="example-item__intent example-item__faded">
      <strong class="example-item__faded"> {{ $t('webapp.evaluate.intent') }}: </strong>
      &nbsp;{{ intent }}
    </div>
    <div
      slot="options"
      class="example-item__faded example-item__options">
      <b-icon
        v-show="!editing"
        :icon="editing ? 'check' : 'pencil'"
        :class="{ clickable: true, 'icon-disabled': editingTranslation }"
        size="is-small"
        @click.native.stop="handleEdit" />
      <b-icon
        class="clickable"
        size="is-small"
        icon="delete"
        @click.native.stop="deleteThisExample" />
    </div>

    <div slot="body">
      <loading v-show="loadingTranslations" />
      <p
        v-if="translationLoadError"
        class="has-text-centered">
        {{ $t('webapp.translate.error_load_translation') }}
        <a @click="loadTranslations"> {{ $t('webapp.translate.retry') }} </a>
      </p>
      <p
        v-else-if="translations && translations.length === 0"
        class="has-text-centered"> {{ $t('webapp.translate.no_translation') }} </p>
      <div
        v-for="(translation, index) in (translations || [])"
        :key="translation.id" >
        <example-translation
          :all-entities="availableEntities"
          :disable-edit="editing || editingTranslation && translation.id !== editingTranslation"
          v-bind="translation"
          @edit="onEditTranslationChange"
          @edited="onEdited"
          @deleted="translationDeleted(translation.id)"
        />
        <div
          v-if="index < (translations || []).length - 1"
          class="example-item__separator" />
      </div>
    </div>
  </component>
</template>

<script>
import Vue from 'vue';
import SentenceAccordion from '@/components/shared/accordion/SentenceAccordion';
import ExampleTranslation from '@/components/shared/accordion/ExampleTranslation';
import HighlightedText from '@/components/shared/HighlightedText';
import LanguageBadge from '@/components/shared/LanguageBadge';
import EntityTag from '@/components/repository/repository-evaluate/example/EntityTag';
import EditExample from '@/components/shared/accordion/EditExample';
import Loading from '@/components/shared/Loading';
import EditExampleAccordion from '@/components/shared/accordion/EditExampleAccordion';
import { mapActions } from 'vuex';

export default {
  name: 'ExampleAccordionWithTranslations',
  components: {
    SentenceAccordion,
    HighlightedText,
    LanguageBadge,
    EntityTag,
    EditExample,
    ExampleTranslation,
    EditExampleAccordion,
    Loading,
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
      translations: null,
      loadingTranslations: false,
      editingTranslation: null,
      translationLoadError: false,
    };
  },
  computed: {
    allEntities() {
      if (!this.repository || !this.repository.entities) return [];
      return this.repository.entities.map(entity => entity.value);
    },
    availableEntities() {
      return this.entities.map(entity => entity.entity);
    },
  },
  watch: {
    open() {
      if (this.open && !this.translations) {
        this.loadTranslations();
      }
    },
  },
  methods: {
    ...mapActions([
      'deleteExample',
      'getTranslations',
    ]),
    async onEdited(edited) {
      const index = this.translations.findIndex(translation => translation.id === edited.id);
      if (index < 0) return;
      Vue.set(this.translations, index, edited);
    },
    onEditTranslationChange({ id, editing }) {
      this.editingTranslation = editing ? id : null;
    },
    onSaveList() {
      this.$emit('updateList');
    },
    translationDeleted(id) {
      this.translations = this.translations.filter(translation => translation.id !== id);
    },
    handleEdit() {
      this.editing = !this.editing;
    },
    async loadTranslations() {
      this.$emit('loadedTranslations');
      this.loadingTranslations = true;
      this.translationLoadError = false;
      const translationsList = await this.getTranslations({
        repositoryUuid: this.repository.uuid,
        repositoryVersion: this.repositoryVersion,
        original_example_id: this.id,
      });
      try {
        this.translations = await translationsList.getAllItems();
      } catch (e) {
        this.translationLoadError = true;
      } finally {
        this.loadingTranslations = false;
      }
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

        &__separator {
            background-color: $color-grey;
            width: 100%;
            height: 2px;
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
            display: flex;
            margin-right: 1rem;
            text-align: right;
        }

        &__options {
          display: flex;
          > * {
            margin-left: 0.25rem;
          }
        }
    }
</style>
