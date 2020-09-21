<template>
  <div class="translate-item">
    <translate-example-before
      v-bind="$props"
      :open.sync="open"
      :selected.sync="selected"
      pending-example/>
    <loading v-show="loadingTranslations" />
    <translate-example-form
      v-show="!loadingTranslations"
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
import { mapActions } from 'vuex';
import TranslateExampleForm from './TranslateExampleForm';
import ExampleAccordion from '@/components/shared/accordion/ExampleAccordion';
import TranslateExampleBefore from './TranslateExampleBefore';
import { getEntitiesList } from '@/utils';
import Loading from '@/components/shared/Loading';

export default {
  name: 'TranslateExample',
  components: {
    TranslateExampleForm,
    ExampleAccordion,
    TranslateExampleBefore,
    Loading,
  },
  props: {
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
    repository: {
      type: Object,
      default: /* istanbul ignore next */ () => ({}),
    },
    language: {
      type: String,
      required: true,
    },
    translateTo: {
      type: String,
      required: true,
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
      loadingTranslations: false,
      selected: false,
      translationData: {
        text: '',
        entities: [],
      },
    };
  },
  computed: {
    // ...mapGetters([
    //   'activeTutorial',
    // ]),
    entitiesList() {
      return getEntitiesList(this.entities);
    },
    isEmpty() {
      return !(this.translationData && this.translationData.text.trim().length > 0);
    },
  },
  watch: {
    translationData() {
      if (!this.translationData.text) return;
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
      if (this.selected) this.save();
    });
    this.$root.$on('deleteAll', () => {
      this.open = false; if (this.selected) {
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
    ]),
    onSelectAll(value) {
      this.selected = value;
    },
    async save() {
      try {
        if (this.isEmpty) {
          if (!this.translation) return;
          await this.deleteTranslation({ translationId: this.translation.id });
          this.clearCache();
          this.translation = null;
        } else {
          this.loadingTranslations = true;
          let response = null;
          if (this.translation) {
            response = await this.editTranslation({
              translationId: this.translation.id,
              ...this.translationData,
              language: this.translateTo,
              originalExample: this.id,
            });
          } else {
            response = await this.newTranslation({
              exampleId: this.id,
              ...this.translationData,
              language: this.translateTo,
            });
          }
          this.clearCache();
          this.translation = response.data;
        }
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
      /* istanbul ignore next */
      this.$bhToastNotification({
        message: this.$t('webapp.translate.example_translated'),
        type: 'success',
      });
      /* istanbul ignore next */
      this.$emit('dispatchEvent', 'translated');
    },
    async loadTranslation() {
      this.$emit('loadedTranslations');
      this.translation = null;
      this.loadingTranslations = true;
      this.translationLoadError = false;
      try {
        const response = await this.getTranslationFromSentence({
          repositoryUuid: this.repository.uuid,
          repositoryVersion: this.repositoryVersion,
          toLanguage: this.translateTo,
          originalId: this.id,
          limit: 1,
        });
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
    .translate-item {
        display: flex;
        > * {
            width: 50%;
            height: 100%;
            margin-right: 1rem;
        }
    }
</style>
