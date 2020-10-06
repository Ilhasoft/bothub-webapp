<template>
  <div class="translate-item">
    <translate-example-before
      v-bind="$props"
      :invalid="translation && !translation.has_valid_entities"
      :open.sync="open"
      :selectable="!editing"
      :selected.sync="selected"
      pending-example/>
    <loading v-show="loadingTranslations" />
    <span
      v-show="!loadingTranslations && translationLoadError"
      class="translate-item__error">
      {{ $t('webapp.translate.error_load_translation') }}

      <a @click="loadTranslation()">
        {{ $t('webapp.translate.retry') }}
      </a>
    </span>
    <translate-example-form
      v-if="!translationLoadError && !loadingTranslations"
      ref="form"
      v-model="translationData"
      :class="{'translate-item--dark': !translation}"
      :editing="editing"
      :available-entities="entities"
      :initial-data="initialData[id]"
      :translation="translation"
      :open.sync="open"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import TranslateExampleForm from './TranslateExampleForm';
import ExampleAccordion from '@/components/shared/accordion/ExampleAccordion';
import TranslateExampleBefore from './TranslateExampleBefore';
import { getEntitiesList, entityEquals } from '@/utils';
import Loading from '@/components/shared/Loading';

export default {
  name: 'TranslateExampleItem',
  components: {
    TranslateExampleForm,
    ExampleAccordion,
    TranslateExampleBefore,
    Loading,
  },
  props: {
    externalToken: {
      type: String,
      default: null,
    },
    id: {
      type: Number,
      required: true,
    },
    text: {
      type: String,
      default: '...',
    },
    intent: {
      type: String,
      default: '',
    },
    entities: {
      type: Array,
      default: /* istanbul ignore next */ () => ([]),
    },
    created_at: {
      type: String,
      default: '',
    },
    repositoryUuid: {
      type: String,
      default: '',
    },
    language: {
      type: String,
      required: true,
    },
    translateTo: {
      type: String,
      default: null,
    },
    editing: {
      type: Boolean,
      default: false,
    },
    initialData: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      open: false,
      translation: null,
      translationLoadError: true,
      loadingTranslations: true,
      selected: false,
      translationData: {
        text: '',
        entities: [],
      },
    };
  },
  computed: {
    ...mapGetters({
      repositoryVersion: 'getSelectedVersion',
    }),
    entitiesList() {
      return getEntitiesList(this.entities);
    },
    isEmpty() {
      return !(this.translationData && this.translationData.text.trim().length > 0);
    },
    actions() {
      return {
        create: this.externalToken
          ? () => this.newTranslationExternal({
            token: this.externalToken,
            exampleId: this.id,
            ...this.saveTranslationData(this.translationData),
          })
          : () => this.newTranslation({
            exampleId: this.id,
            ...this.saveTranslationData(this.translationData),
            language: this.translateTo,
          }),
        update: this.externalToken
          ? () => this.editTranslationExternal({
            token: this.externalToken,
            translationId: this.translation.id,
            ...this.saveTranslationData(this.translationData),
            originalExample: this.id,
          })
          : () => this.editTranslation({
            translationId: this.translation.id,
            ...this.saveTranslationData(this.translationData),
            language: this.translateTo,
            originalExample: this.id,
          }),
        delete: this.externalToken
          ? () => this.deleteTranslationExternal(
            { token: this.externalToken, translationId: this.translation.id },
          )
          : () => this.deleteTranslation({ translationId: this.translation.id }),
        getTranslation: this.externalToken
          ? () => this.getTranslationFromSentenceExternal({
            token: this.externalToken,
            originalId: this.id,
            limit: 1,
          })
          : () => this.getTranslationFromSentence({
            repositoryUuid: this.repositoryUuid,
            repositoryVersion: this.repositoryVersion,
            toLanguage: this.translateTo,
            originalId: this.id,
            limit: 1,
          }),
      };
    },
  },
  watch: {
    translationData() {
      if (this.unchanged()) {
        this.clearCache();
        return;
      }
      this.$emit('dispatchEvent', {
        event: 'onChange',
        value: {
          id: this.id,
          data: this.isEmpty ? null : this.translationData,
        },
      });
    },
  },
  created() {
    this.$root.$on('selectAll', (value) => { this.onSelectAll(value); });
    this.$root.$on('saveAll', () => {
      this.open = false;
      if (!this.translationLoadError) this.save();
    });
    this.$root.$on('deleteAll', () => {
      this.open = false;
      if (!this.translationLoadError && this.selected) {
        this.translationData.text = '';
        this.save();
      }
    });
  },
  mounted() {
    this.loadTranslation();
  },
  methods: {
    ...mapActions([
      'getTranslationFromSentence',
      'newTranslation',
      'editTranslation',
      'deleteTranslation',
      'newTranslationExternal',
      'editTranslationExternal',
      'deleteTranslationExternal',
      'getTranslationFromSentenceExternal',
    ]),
    unchanged() {
      if (!this.translation) return false;
      if (!this.translationData) return true;
      return this.translationData.text === this.translation.text
            && entityEquals(this.translationData.entities || [], this.translation.entities || []);
    },
    onSelectAll(value) {
      this.selected = value;
    },
    saveTranslationData(data) {
      if (!data) return {};
      return {
        text: data.text,
        entities: (data.entities || []).map((entityObject) => {
          const {
            start, end, entity, value,
          } = entityObject;
          return {
            start, end, entity, value,
          };
        }),
      };
    },
    async save() {
      try {
        if (this.unchanged()) return;
        if (this.isEmpty) {
          if (!this.translation) return;
          this.loadingTranslations = true;
          await this.actions.delete();
          this.clearCache();
          this.translation = null;
          this.loadingTranslations = false;
        } else {
          this.loadingTranslations = true;
          let response = null;
          if (this.translation) {
            response = await this.actions.update();
          } else {
            response = await this.actions.create();
          }
          this.clearCache();
          this.translation = response.data;
        }
        this.onTranslated();
      } catch (e) {
        this.translationLoadError = true;
      } finally {
        this.loadingTranslations = false;
      }
    },
    clearCache() {
      this.$emit('dispatchEvent', {
        event: 'onChange',
        value: {
          id: this.id,
          data: null,
        },
      });
    },
    onTranslated() {
      this.$emit('dispatchEvent', 'translated');
    },
    async loadTranslation() {
      this.$emit('loadedTranslations');
      this.translation = null;
      this.loadingTranslations = true;
      this.translationLoadError = false;
      try {
        const response = await this.actions.getTranslation();
        const [item] = response.data.results;
        if (item) this.translation = JSON.parse(JSON.stringify(item));
      } catch (e) {
        this.translationLoadError = true;
      } finally {
        this.loadingTranslations = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/colors.scss';
    .translate-item {
        display: flex;
        > * {
            width: 50%;
            height: 100%;

            &:not(:last-child) {
              margin-right: 1rem;
            }
        }
      &__error {
        border: 1px solid $color-border;
        border-radius: 4px;
        text-align: center;
        padding: .45rem 0;
        margin-top: .5rem;
      }
    }
</style>
