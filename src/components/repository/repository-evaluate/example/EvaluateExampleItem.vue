<template>
  <div class="example">
    <example-accordion
      :id="id"
      :text="text"
      :entities="entities"
      :intent="intent" />
  </div>
</template>

<script>
import ExampleAccordion from '@/components/shared/accordion/ExampleAccordion';

export default {
  name: 'EvaluateExampleItem',
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
  },
  data() {
    return {
      editEvaluateExampleModalOpen: false,
    };
  },
};
</script>
