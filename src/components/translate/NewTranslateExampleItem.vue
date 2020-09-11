<template>
  <div class="translate-item">
    <example-accordion
      v-bind="$props"
      :open.sync="open"
      pending-example/>
    <translate-example-form
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
import { getEntitiesList } from '@/utils';

export default {
  name: 'TranslateExample',
  components: {
    TranslateExampleForm,
    ExampleAccordion,
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
      blockedNextStepTutorial: true,
      open: false,
      translation: null,
      translationLoadError: true,
      loadingTranslations: false,
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
  watch: {
    formOpen() {
      if (this.formOpen === true && this.activeTutorial === 'translate') {
        this.$nextTick(() => {
          this.dispatchStep();
        });
      }
    },
  },
  mounted() {
    this.loadTranslations();
  },
  methods: {
    ...mapActions([
      'getTranslations',
    ]),
    dispatchClick() {
      this.eventClick = !this.eventClick;
    },
    toggleFormOpen() {
      /* istanbul ignore next */
      this.formOpen = !this.formOpen;
      this.blockedNextStepTutorial = false;
    },
    dispatchStep() {
      this.$emit('dispatchEvent', { event: 'dispatchStep' });
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
    async loadTranslations() {
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
        &--dark {
          background-color: red;
        }
        margin-bottom: 1rem;
    }
</style>
