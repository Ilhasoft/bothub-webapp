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
      :available-entities="entities"
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
  },
  data() {
    return {
      deleteDialog: null,
      formOpen: false,
      highlighted: null,
      eventClick: false,
      open: false,
      translation: null,
      translationLoadError: true,
      loadingTranslations: false,
      selected: false,
      translationData: {},
    };
  },
  computed: {
    // ...mapGetters([
    //   'activeTutorial',
    // ]),
    entitiesList() {
      return getEntitiesList(this.entities);
    },
  },
  created() {
    this.$root.$on('selectAll', (value) => { this.onSelectAll(value); });
    this.$root.$on('saveAll', () => {
      this.open = false;
      if (this.selected) this.save();
    });
    this.$root.$on('clearAll', () => { this.$refs.form.clear(); });
  },
  mounted() {
    this.loadTranslation();
  },
  methods: {
    ...mapActions([
      'getTranslations',
      'newTranslation',
      'editTranslation',
      'deleteTranslation',
    ]),
    onSelectAll(value) {
      this.selected = value;
    },
    async save() {
      let error = null;
      try {
        if (this.translation) {
          if (this.translationData.text && this.translationData.text.trim().length > 0) {
            await this.editTranslation({
              translationId: this.translation.id,
              ...this.translationData,
              language: this.translateTo,
              originalExample: this.id,
            });
          } else {
            this.deleteTranslation({ translationId: this.translation.id });
          }
        } else {
          if (this.translationData.text.trim() === '') return;
          await this.newTranslation({
            exampleId: this.id,
            ...this.translationData,
            language: this.translateTo,
          });
        }
      } catch (e) {
        error = e;
      }

      if (!error) this.loadTranslation();
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
      const translationsList = await this.getTranslations({
        repositoryUuid: this.repository.uuid,
        repositoryVersion: this.repositoryVersion,
        original_example_id: this.id,
      });
      try {
        const items = await translationsList.updateItems(1);
        if (items.length) [this.translation] = items;
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
        margin-bottom: 1rem;
    }
</style>
