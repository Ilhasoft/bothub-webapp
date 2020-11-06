<template>
  <div class="example">
    <example-accordion
      :id="id"
      :text="text"
      :entities="entities"
      :intent="intent"
      :language="language"
      :available-to-example="true"
      :pending-example="pendingExample"
      :suggestion="isSuggestion"
      :all-entities="allEntities"
      :open.sync="open"
      training
      @deleted="onExampleDeleted"
      @updateList="onExampleSave"
    />
  </div>
</template>

<script>
import ExampleAccordion from '@/components/shared/accordion/ExampleAccordion';


export default {
  name: 'ExampleItem',
  components: {
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
    language: {
      type: String,
      default: null,
    },
    getAllEntities: {
      type: Array,
      default: () => [],
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
    pendingExample: {
      type: Boolean,
      default: false,
    },
    isSuggestion: {
      type: Boolean,
      default: false,
    },
    isAccordionOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      open: false,
    };
  },
  computed: {
    allEntities() {
      return this.repository.entities.map(
        entityValue => entityValue.value,
      );
    },
  },
  watch: {
    isAccordionOpen() {
      this.open = false;
    },
  },
  methods: {
    onExampleDeleted() {
      this.$emit('deleted');
    },
    onExampleSave() {
      this.$emit('updateList');
    },
  },
};
</script>
