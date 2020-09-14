<template>
  <sentence-accordion
    :open.sync="isOpen"
    pending-example >

    <div slot="check">
      <b-checkbox />
    </div>

    <div
      slot="header"
      class="level">

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

    <div slot="body">
      <example-info
        v-if="!editing"
        :entities-list="entitiesList"
        :highlighted.sync="highlighted"
        :intent="intent" />

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
  name: 'TranslateExampleBefore',
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
    open: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isOpen: false,
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
      this.isOpen = this.open;
    },
    isOpen() {
      this.$emit('update:open', this.isOpen);
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
      );
      return `entity-${color}`;
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
