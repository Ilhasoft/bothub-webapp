<template>
  <div class="example">
    <example-accordion
      :id="id"
      :text="text"
      :entities="entities"
      :intent="intent" />
    <edit-evaluate-example-modal
      :open.sync="editEvaluateExampleModalOpen"
      :text-to-edit="text"
      :intent-to-edit="intent"
      :entities-to-edit="entities"
      :language-to-edit="language"
      :sentence-id="id" />
  </div>
</template>

<script>
import EditEvaluateExampleModal from '@/components/repository/repository-evaluate/example/EditEvaluateExampleModal';
import ExampleAccordion from '@/components/shared/accordion/ExampleAccordion';

export default {
  name: 'EvaluateExampleItem',
  components: {
    EditEvaluateExampleModal,
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
